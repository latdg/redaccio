import json, re, requests, time
from urllib.parse import urljoin
H={"User-Agent":"Mozilla/5.0 (LaTdG-recerca)"}
out={"catalog":{}, "proves":{}, "escuts":{}}
Q=["fets penals","delictes","lloguer","accidents trànsit","residus municipals","autoconsum","explotacions ramaderes","granges","llista d'espera","matrícula alumnes","preinscripció","habitatge protegit","entitats","incendis forestals","consum energia elèctrica","bombers","ofertes treball","farmàcies","transport públic horaris","retribucions","establiments comercials","parc de vehicles","emissions","soroll","renda","beques","ajuts menjador","equipaments","sismicitat","ITV","subvencions","pressupostos ens locals","afiliació","contractes laborals","certificats energètics","llicències","planejament urbanístic","defuncions","naixements","padró","biblioteques","museus visitants","patrimoni arquitectònic","arbres monumentals","camins","platges","contaminació","ozó","aigua consum","embassaments","nitrats","incendis","inspeccions","sancions","denúncies","mediació","jutjats","violència","emergències 112","trucades 112","ambulàncies SEM","urgències","hospital","vacunació","farmàcia","residències","dependència","serveis socials","ajuts habitatge","desnonaments","habitatges buits","segona residència","turisme","càmpings","restaurants","comerç","mercats","fires","festes","associacions","cooperatives","empreses","societats","concursos","multes","radars","velocitat","aparcament","bicicleta","bus","tren","taxi","aeroport","port","ponts","obres","carreteres","IMD trànsit","aforaments"]
seen=set()
for q in Q:
    try:
        r=requests.get("https://analisi.transparenciacatalunya.cat/api/catalog/v1",params={"q":q,"limit":10,"only":"datasets"},headers=H,timeout=60)
        res=[]
        for x in r.json().get("results",[]):
            rr=x["resource"]
            if rr["id"] in seen: continue
            seen.add(rr["id"])
            res.append({"nom":rr["name"],"id":rr["id"],"act":rr.get("data_updated_at"),"camps":rr.get("columns_field_name",[])[:30],"desc":(rr.get("description") or "")[:200]})
        out["catalog"][q]=res
    except Exception as e:
        out["catalog"][q]=str(e)
    time.sleep(0.3)
P={"insideairbnb":"https://insideairbnb.com/get-the-data/",
 "icgc_wms_orto":"https://geoserveis.icgc.cat/servei/catalunya/orto-territorial/wms?REQUEST=GetCapabilities&SERVICE=WMS",
 "icgc_wms_historic":"https://geoserveis.icgc.cat/servei/catalunya/orto-historica/wms?REQUEST=GetCapabilities&SERVICE=WMS",
 "ign_sismo_feed":"https://www.ign.es/ign/RssTools/sismologia.xml",
 "pmp_hacienda":"https://www.hacienda.gob.es/es-ES/CDI/Paginas/PeriodoMedioPago/InformacionAAPPs/PMP-EELL.aspx",
 "aeat_irpf_municipis":"https://sede.agenciatributaria.gob.es/AEAT/Contenidos_Comunes/La_Agencia_Tributaria/Estadisticas/Publicaciones/sites/irpfmunicipios/2023/home.html",
 "ine_api":"https://servicios.ine.es/wstempus/js/ES/OPERACIONES_DISPONIBLES",
 "edistribucion":"https://www.edistribucion.com/es/averias-y-cortes/cortes-programados.html",
 "inaturalist":"https://api.inaturalist.org/v1/observations?lat=41.96&lng=3.04&radius=5&per_page=1&order_by=observed_on",
 "gbif":"https://api.gbif.org/v1/occurrence/search?decimalLatitude=41.9,42.0&decimalLongitude=3.0,3.1&limit=1",
 "premsa_girona":"https://www.girona.cat/sgdap/cat/premsa.php",
 "arca":"https://arca.bnc.cat/arcabib_pro/ca/inici/inici.do",
 "feina_activa":"https://feinaactiva.gencat.cat/",
 "sindicatura":"https://www.sindicatura.cat/web/guest/rendicio-de-comptes",
 "banda_ampla":"https://avancedigital.mineco.gob.es/banda-ancha/cobertura/consulta/Paginas/consulta-cobertura.aspx",
 "idescat_emex":"https://api.idescat.cat/emex/v1/dades.json?id=170222",
 "cens_electoral":"https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177022",
 "ajut_pac_fega":"https://www.fega.gob.es/es/datos-abiertos/consulta-de-beneficiarios-pac",
 "gtfs_catalunya":"https://www.gencat.cat/mobilitat/dades-obertes/",
 "aena_estadistiques":"https://www.aena.es/es/estadisticas/inicio.html",
 "farmacies_girona":"https://www.cofgi.org/farmacies/farmacies-de-guardia",
 "meteo_smc_xema":"https://analisi.transparenciacatalunya.cat/resource/nzvn-apee.json?$limit=1",
}
for k,u in P.items():
    try:
        r=requests.get(u,headers=H,timeout=30)
        out["proves"][k]={"codi":r.status_code,"mida":len(r.content),"inici":re.sub(r"\s+"," ",r.text[:400])}
    except Exception as e:
        out["proves"][k]={"error":type(e).__name__+": "+str(e)[:150]}
# Escut de Cruïlles, Monells i Sant Sadurní de l'Heura: webs possibles
for u in ["https://www.cruilles-monells-ssh.cat/","https://cruilles-monells-ssh.cat/","https://www.cruilles.cat/","https://www.ajcruilles.cat/","https://cruilles.cat/","https://www.cruillesmonellsssh.cat/","https://www.bisbal.cat/","https://www.corca.cat/","https://www.forallac.cat/"]:
    try:
        r=requests.get(u,headers=H,timeout=20)
        imgs=re.findall(r'(?:src|href|content)=["\']([^"\']+\.(?:svg|png|jpg|jpeg|gif|webp))["\']',r.text,re.I)
        cand=[urljoin(r.url,i) for i in imgs if re.search(r"escut|logo|blas|heral|shield|ajuntament",i,re.I)]
        out["escuts"][u]={"codi":r.status_code,"final":r.url,"titol":(re.findall(r"<title>(.*?)</title>",r.text,re.S|re.I) or [""])[0].strip()[:120],"candidats":list(dict.fromkeys(cand))[:15]}
    except Exception as e:
        out["escuts"][u]={"error":type(e).__name__}
open("resultat.json","w").write(json.dumps(out,ensure_ascii=False,indent=1))
