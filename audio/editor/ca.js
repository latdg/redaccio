/*
  TRADUCCIÓ AL CATALÀ DE L'EDITOR D'ÀUDIO (AudioMass) — La TdG · 01.11.2026
  No toca la lògica de l'editor: tradueix els textos que es mostren a la pantalla
  (menús, botons, finestres, consells i avisos) a mesura que apareixen.
  Per afegir o corregir una traducció, només cal canviar el diccionari T.
*/
(function ( w, d ) {
	'use strict';

	var T = {
		// --- Barra de menús ---
		'File': 'Fitxer',
		'Edit': 'Edició',
		'View': 'Visualització',
		'Effects': 'Efectes',
		'Help': 'Ajuda',
		'Tempo Tools': 'Eines de tempo',
		'MultiTrack': 'Multipista',
		'Beta': 'Beta',

		// --- Fitxer ---
		'Export / Download': 'Exporta / Descarrega',
		'Load from Computer': "Obre des de l'ordinador",
		'Load Sample File': "Obre l'àudio de mostra",
		'Load From URL': "Obre des d'un enllaç",
		'New Recording': 'Gravació nova',
		'New Empty Project': 'Projecte nou buit',
		'Save Draft Locally': 'Desa un esborrany al navegador',
		'Open Local Drafts': 'Obre els esborranys desats',
		'Store Offline Version': 'Desa la versió fora de línia',
		'Update Offline Version': 'Actualitza la versió fora de línia',
		'Load Multitrack Sample': 'Obre la mostra multipista',

		// --- Edició ---
		'Undo': 'Desfés',
		'Redo': 'Refés',
		'Play': 'Reprodueix',
		'Stop': 'Atura',
		'Select All': 'Selecciona-ho tot',
		'Deselect All': 'Desselecciona-ho tot',
		'Zero Cross Selection': 'Selecció en pas per zero',
		'Copy': 'Copia',
		'Paste': 'Enganxa',
		'Cut': 'Retalla',
		'Delete': 'Suprimeix',
		'Paste to New Channel': 'Enganxa en un canal nou',
		'Insert Silence': 'Insereix silenci',
		'Seamless Loop': 'Bucle continu',
		'Seamless Loop...': 'Bucle continu…',
		'Shft+Z': 'Maj+Z',
		'Shft+Y': 'Maj+Y',
		'Shft+A': 'Maj+A',
		'Space': 'Espai',

		// --- Visualització ---
		'Follow Cursor': 'Segueix el cursor',
		'Center to Cursor': 'Centra al cursor',
		'Timeline': 'Línia de temps',
		'Peak Separators': 'Separadors de pic',
		'Frequency Analyser': 'Analitzador de freqüències',
		'Spectrum Analyser': "Analitzador d'espectre",
		'Multitrack Mixer': 'Mesclador multipista',
		'Reset Zoom': 'Restableix el zoom',
		'Reset Zoom (0)': 'Restableix el zoom (0)',
		'Zoom In Horiz (+)': 'Amplia en horitzontal (+)',
		'Zoom Out Horiz (-)': 'Redueix en horitzontal (-)',
		'Zoom In Vertically': 'Amplia en vertical',
		'Zoom Out Vertically': 'Redueix en vertical',
		'Select Visible View': 'Selecciona la part visible',

		// --- Efectes ---
		'Set Volume/Gain': 'Volum / guany',
		'Gain': 'Guany',
		'Fade In': 'Fosa d\'entrada',
		'Fade Out': 'Fosa de sortida',
		'Normalize': 'Normalitza',
		'Compressor': 'Compressor',
		'Hard Limiter': 'Limitador',
		'Hard Limit': 'Limitador',
		'Hard Limiting': 'Limitació',
		'Graphic EQ': 'Equalitzador gràfic',
		'Graphic EQ (20 bands)': 'Equalitzador gràfic (20 bandes)',
		'Paragraphic EQ': 'Equalitzador paramètric gràfic',
		'Parametric EQ': 'Equalitzador paramètric',
		'Delay': 'Retard (eco)',
		'Distortion': 'Distorsió',
		'Reverb': 'Reverberació',
		'Speed / Playback Rate': 'Velocitat de reproducció',
		'Speed Up / Slow Down (pitch)': 'Accelera / alenteix (amb to)',
		'Speed': 'Velocitat',
		'Rate': 'Velocitat',
		'Reverse': 'Inverteix el sentit',
		'Invert': 'Inverteix la fase',
		'Remove Silence': 'Treu els silencis',
		'Noise Reduction (Voice)': 'Reducció de soroll (veu)',
		'Audio Repair': "Reparació d'àudio",
		'Channel Info/Flip': 'Canals / intercanvi',
		'Channel Info': 'Informació dels canals',
		'ID3 Tags': 'Etiquetes ID3',
		'ID3 Tag Editor': "Editor d'etiquetes ID3",

		// --- Ajuda ---
		'About': 'Quant a',
		'About AudioMass': 'Quant a AudioMass',
		'See Welcome Message': 'Mostra la benvinguda',
		'SourceCode on Github': 'Codi font a GitHub',

		// --- Barra d'eines i botons ---
		'Play (Space)': 'Reprodueix (Espai)',
		'Pause (Shift+Space)': 'Pausa (Maj+Espai)',
		'Stop Playback (Space)': 'Atura (Espai)',
		'Record (R)': 'Grava (R)',
		'Toggle Loop (L)': 'Bucle (L)',
		'Seek (left arrow)': 'Enrere (fletxa esquerra)',
		'Seek (right arrow)': 'Endavant (fletxa dreta)',
		'Seek Start (Shift + left arrow)': 'Ves a l\'inici (Maj + fletxa esquerra)',
		'Seek End (Shift + right arrow)': 'Ves al final (Maj + fletxa dreta)',
		'Copy Selection (Shift + C)': 'Copia la selecció (Maj + C)',
		'Paste Selection (Shift + V)': 'Enganxa (Maj + V)',
		'Cut Selection (Shift + X)': 'Retalla la selecció (Maj + X)',
		'Clear Selection (Q key)': 'Treu la selecció (tecla Q)',
		'Insert Silence (Shift + N)': 'Insereix silenci (Maj + N)',
		'Selection:': 'Selecció:',
		'Selection': 'Selecció',
		'Start:': 'Inici:',
		'End:': 'Final:',
		'Duration:': 'Durada:',
		'Start': 'Inici',
		'End': 'Final',
		'Drag n drop an Audio File in this window, or click': "Arrossega un fitxer d'àudio a aquesta finestra o fes clic",
		'Drag and Drop Audio Files in this window, or click': "Arrossega fitxers d'àudio a aquesta finestra o fes clic",
		'here to use a sample': 'aquí per fer servir una mostra',
		'Drag n drop Files!': 'Deixa anar els fitxers!',

		// --- Finestres (comú) ---
		'CANCEL': 'CANCEL·LA',
		'cancel': 'cancel·la',
		'OK': "D'acord",
		'ON': 'ACTIU',
		'OFF': 'INACTIU',
		'Apply': 'Aplica',
		'Apply Changes': 'Aplica els canvis',
		'Save': 'Desa',
		'Save As New': 'Desa com a nou',
		'Update': 'Actualitza',
		'Reset': 'Restableix',
		'Preview': 'Previsualitza',
		'Presets': 'Predefinits',
		'Toggle Bypass': 'Activa / desactiva',
		'Save or Modify preset': 'Desa o modifica el predefinit',
		'Preset Name': 'Nom del predefinit',
		'My Preset': 'El meu predefinit',
		'Custom': 'Personalitzat',
		'Please Wait...': 'Espera…',
		'Please wait, applying FX': "Espera, s'aplica l'efecte",
		'Loaded Successfully': "S'ha carregat correctament",
		'Name is too short...': 'El nom és massa curt…',

		// --- Exportar ---
		'Export': 'Exporta',
		'Export whole file': 'Exporta tot el fitxer',
		'Export Selection Only': 'Exporta només la selecció',
		'File Name': 'Nom del fitxer',
		'(optional) filename': '(opcional) nom del fitxer',
		'mp3 filename': 'nom del fitxer mp3',
		'Format': 'Format',
		'Mono': 'Mono',
		'Stereo': 'Estèreo',
		'Flac: Compression Level': 'FLAC: nivell de compressió',
		'TPDF dither': 'Dither TPDF',
		'32-bit float': '32 bits (coma flotant)',
		'16-bit': '16 bits',
		'24-bit': '24 bits',
		'session file (.amss)': 'fitxer de sessió (.amss)',
		'Nothing to export': 'No hi ha res per exportar',

		// --- Obrir / esborranys ---
		'Load audio from remote url': "Obre un àudio des d'un enllaç",
		'Insert url': "Enganxa l'enllaç",
		'Please insert url': "Enganxa-hi l'enllaç",
		'Load Asset': 'Obre',
		'Invalid URL entered': "L'enllaç no és vàlid",
		'Save Local Draft of...': 'Desa un esborrany de…',
		'Whole Track': 'Tota la pista',
		'Whole track': 'Tota la pista',
		'"Copy" clipboard/buffer': 'El que hi ha copiat',
		'Draft Name': "Nom de l'esborrany",
		'Local Drafts': 'Esborranys desats',
		'No drafts found...': "No hi ha cap esborrany…",
		'Open or append': 'Obre o afegeix',
		'Append file to existing track?': 'Vols afegir el fitxer a la pista actual?',
		'OPEN NEW': 'OBRE-LO NOU',
		'ADD IN EXISTING': 'AFEGEIX-LO',
		'APPEND TO EXISTING': 'AFEGEIX-LO',
		'Open in new window, or in the current one?': 'El vols obrir en una finestra nova o en aquesta?',
		'Open in new window?': 'El vols obrir en una finestra nova?',
		'Open in Existing?': 'El vols obrir en aquesta?',
		'OPEN': 'OBRE',
		'OPEN IN NEW': 'OBRE EN UNA NOVA',
		'OPEN IN NEW WINDOW': 'OBRE EN UNA FINESTRA NOVA',
		'Please choose source...': "Tria l'origen…",
		'Canceled Loading': "S'ha cancel·lat la càrrega",
		'Unsupported audio file type': "Aquest tipus de fitxer d'àudio no és compatible",
		'Unsupported audio file.': "Fitxer d'àudio no compatible.",
		'Could not load audio': "No s'ha pogut carregar l'àudio",
		'Could not decode audio': "No s'ha pogut llegir l'àudio",
		'Sample File': 'Àudio de mostra',

		// --- Gravació ---
		'START RECORDING': 'COMENÇA A GRAVAR',
		'FINISH RECORDING': 'ACABA LA GRAVACIÓ',
		'PAUSE': 'PAUSA',
		'UN-PAUSE': 'CONTINUA',
		'OPEN RECORDING': 'OBRE LA GRAVACIÓ',
		'Open Recording': 'Obre la gravació',
		'Devices:': 'Dispositius:',
		'Record Audio': 'Grava àudio',
		'Recorded Audio': 'Àudio gravat',
		'Recording': 'Gravació',
		'Are you sure? This will discard the current recording.': 'Segur? Es perdrà la gravació actual.',
		'No recording device found': "No s'ha trobat cap micròfon",
		'no microphone permissions found!': 'No hi ha permís per fer servir el micròfon!',
		'Stop the recording first': 'Primer atura la gravació',

		// --- Silenci ---
		'Silence': 'Silenci',
		'Silence in seconds': 'Silenci en segons',
		'Insert silence at beginning': "Insereix el silenci a l'inici",
		'Insert silence at current cursor (': 'Insereix el silenci al cursor (',
		'Inserted Silence': "S'ha inserit silenci",

		// --- Guany, normalitzar, compressor, limitador ---
		'Gain percentage': 'Percentatge de guany',
		'Apply Gain': 'Aplica el guany',
		'Apply Gain to selected range': 'Aplica el guany a la selecció',
		'Volume Graph': 'Gràfic de volum',
		'Normalize to': 'Normalitza a',
		'Normalize L/R Equally': 'Normalitza els dos canals igual',
		'Mode': 'Mode',
		'Peak': 'Pic',
		'Peak ceiling': 'Sostre de pic',
		'Target': 'Objectiu',
		'Loudness': 'Sonoritat',
		'Custom LUFS': 'LUFS personalitzat',
		'Measuring...': 'Mesurant…',
		'Select LUFS to measure integrated loudness.': 'Tria LUFS per mesurar la sonoritat integrada.',
		'Podcast (-16 LUFS)': 'Pòdcast (-16 LUFS)',
		'Podcast': 'Pòdcast',
		'Broadcast EBU R128 (-23 LUFS)': 'Ràdio i TV, EBU R128 (-23 LUFS)',
		'Broadcast ATSC A/85 (-24 LUFS)': 'Ràdio i TV, ATSC A/85 (-24 LUFS)',
		'Club / DJ Master (-8 LUFS)': 'Club / DJ (-8 LUFS)',
		'Threshold': 'Llindar',
		'Ratio': 'Relació',
		'Knee': 'Corba (knee)',
		'Attack': 'Atac',
		'Release': 'Alliberament',
		'Makeup': 'Compensació',
		'Reduction': 'Reducció',
		'Look Ahead (ms)': 'Anticipació (ms)',
		'Limit to': 'Limita a',
		'Apply Compression to selected range': 'Aplica la compressió a la selecció',
		'Light Touch': 'Suau',
		'Classic': 'Clàssic',
		'Classic 3:1': 'Clàssic 3:1',
		'Brickwall Limit': 'Limitació total',
		'Heavy Crush': 'Compressió forta',
		'Vocal — Broadcast': 'Veu — ràdio',
		'Vocal — Lead': 'Veu — principal',
		'Master Glue': 'Cohesió del màster',
		'Drum Bus Glue': 'Cohesió de bateria',
		'Bass Even-Out': 'Iguala els greus',

		// --- Equalitzadors ---
		'Apply EQ': "Aplica l'equalització",
		'Bass Boost': 'Reforç de greus',
		'Treble Boost': "Reforç d'aguts",
		'Low': 'Greus',
		'Medium': 'Mitjans',
		'High': 'Aguts',
		'Warm': 'Càlid',
		'Bright': 'Brillant',
		'Air': 'Aire',
		'Air / Brilliance': 'Aire / brillantor',
		'Telephone': 'Telèfon',
		'Old Telephone': 'Telèfon antic',
		'Old Radio': 'Ràdio antiga',
		'AM Radio': 'Ràdio AM',
		'Megaphone': 'Megàfon',
		'Underwater': 'Sota l\'aigua',
		'Lo Fi': 'Baixa fidelitat',
		'Lo-Fi / Vintage': 'Baixa fidelitat / antic',
		'Loudness (Smile)': 'Sonoritat (somriure)',
		'Podcast Voice': 'Veu de pòdcast',
		'Vocal Presence': 'Presència de veu',
		'Vocal Clarity': 'Claredat de veu',
		'De-Esser': 'Treu les esses',
		'De-Rumble': 'Treu el retrunyiment',
		'Rumble Cut': 'Talla el retrunyiment',
		'Acoustic': 'Acústic',
		'Acoustic Smooth': 'Acústic suau',
		'Acoustic Sparkle': 'Acústic brillant',
		'Drum Punch': 'Cop de bateria',
		'Kick Tighten': 'Bombo més sec',
		'Snare Punch': 'Caixa amb cop',
		'Hip Hop': 'Hip-hop',
		'V-Shape': 'Forma de V',
		'freq': 'freq.',
		'gain': 'guany',
		'type': 'tipus',

		// --- Retard, distorsió, reverberació ---
		'Delay Time': 'Temps de retard',
		'Feedback': 'Realimentació',
		'Wet': 'Efecte',
		'Apply Delay to selected range': 'Aplica el retard a la selecció',
		'Apply Distortion to selected range': 'Aplica la distorsió a la selecció',
		'Dashed Distortion': 'Distorsió trencada',
		'Apply Reverb to selected range': 'Aplica la reverberació a la selecció',
		'Time': 'Temps',
		'Decay': 'Caiguda',
		'Small Room': 'Sala petita',
		'Medium Room': 'Sala mitjana',
		'Large Hall': 'Sala gran',
		'Cathedral': 'Catedral',
		'Cave': 'Cova',
		'Plate': 'Placa',
		'Spacey': 'Espacial',
		'Vocal Booth': 'Cabina de veu',
		'Drum Chamber': 'Cambra de bateria',
		'Tight Slap': 'Rebot curt',
		'Ambient Wash': 'Ambient ampli',

		// --- Velocitat ---
		'Change Speed': 'Canvia la velocitat',
		'Playback Rate': 'Velocitat de reproducció',
		'Apply Rate': 'Aplica la velocitat',
		'Pitch / Speed Profile': 'Perfil de to / velocitat',
		'Apply Profile': 'Aplica el perfil',
		'Preview Loop': 'Previsualitza en bucle',
		'Repeat loop': 'Repeteix el bucle',
		'A lot slower': 'Molt més lent',
		'Slightly slower': 'Una mica més lent',
		'Slightly faster': 'Una mica més ràpid',
		'Blazing Fast': 'Molt ràpid',
		'Accelerate': 'Accelera',
		'Car Approaching': "Cotxe que s'acosta",
		'Car Driving Away': "Cotxe que s'allunya",
		'Doppler Pass': 'Pas Doppler',
		'Engine Rev': 'Motor accelerant',
		'Ratio 0%': 'Relació 0%',
		'Ratio between lows and highs': 'Relació entre greus i aguts',

		// --- Reparació d'àudio ---
		'Click Reduction': 'Reducció de clics',
		'Removes short transient clicks': 'Treu clics curts',
		'(vinyl pops, mouth clicks) by detecting': '(petades de vinil, sorolls de boca) detectant',
		'energy spikes and interpolating across them.': "els pics d'energia i suavitzant-los.",
		'Hum Reduction': 'Reducció de brunzit',
		'Mains frequency': 'Freqüència de la xarxa',
		'Auto-detect': 'Detecció automàtica',
		'Notches out the mains hum and seven': 'Treu el brunzit de la xarxa elèctrica i set',
		'harmonics. Auto-detect scans the selection': 'harmònics. La detecció automàtica analitza la selecció',
		'and locks to the actual hum frequency.': 'i troba la freqüència real del brunzit.',
		'Edit Repair': "Reparació d'unions",
		'Smooths DC-offset splices between joined': 'Suavitza els salts entre trossos',
		'audio of similar energy. Use after pasting': "d'àudio enganxats amb energia semblant. Fes-la servir després d'enganxar",
		'from another source. Not for note onsets.': "d'una altra font. No serveix per a l'inici de notes.",
		'Sensitivity': 'Sensibilitat',
		'Analysis': 'Anàlisi',
		'Audio Repair is not available in multitrack': "La reparació d'àudio no està disponible al multipista",

		// --- Canals ---
		'Left Channel': 'Canal esquerre',
		'Right Channel': 'Canal dret',
		'Flip Channels': 'Intercanvia els canals',
		'Make Mono': 'Converteix a mono',
		'Make Stereo': 'Converteix a estèreo',
		'Open this clip in the editor for channel info': "Obre aquest tros a l'editor per veure'n els canals",
		'Open this clip in the editor for that effect': "Obre aquest tros a l'editor per aplicar-hi aquest efecte",

		'AUTOMATE': 'AUTOMATITZA',

		// --- Bucle continu ---
		'Trim edge silence': 'Retalla el silenci dels extrems',
		'Crossfade': 'Fosa encadenada',
		'Open in New Editor': 'Obre en un editor nou',
		'DOWNLOAD COPY': 'DESCARREGA UNA CÒPIA',

		// --- Etiquetes ID3 ---
		'Choose Audio File': "Tria el fitxer d'àudio",
		'Choose an MP3 file to view/edit audio tags.': 'Tria un fitxer MP3 per veure o editar-ne les etiquetes.',
		'Choose an MP3 file inside this window first': 'Primer tria un fitxer MP3 en aquesta finestra',
		'Only MP3 files can be edited here. These tags are view-only.': 'Aquí només es poden editar fitxers MP3. Aquestes etiquetes només es poden consultar.',
		'Reading metadata...': 'Llegint les dades…',
		'Title': 'Títol',
		'Artist': 'Artista',
		'Album': 'Àlbum',
		'Year': 'Any',
		'Genre': 'Gènere',
		'Track': 'Pista',
		'Comment': 'Comentari',
		'Lyrics': 'Lletra',
		'Change Cover': 'Canvia la portada',
		'Remove Image': 'Treu la imatge',

		// --- Tempo ---
		'Tempo': 'Tempo',
		'Tempo & Rhythm Tools': 'Eines de tempo i ritme',
		'Tempo Estimation': 'Estimació del tempo',
		'Tempo Tap': 'Marca el tempo',
		'Estimate': 'Calcula',
		'Estimated': 'Calculat',
		'Confidence': 'Fiabilitat',
		'Beats': 'Temps',
		'Metronome': 'Metrònom',
		'Waveform': 'Ona',
		'Loop': 'Bucle',
		'Runs in the background when you click Estimate.': 'Es fa en segon pla quan cliques «Calcula».',
		'Tap in this area, or hit [SPACE] rhythmically, to measure BPM.': 'Toca aquesta àrea, o prem [ESPAI] seguint el ritme, per mesurar les BPM.',
		'Selection Only': 'Només la selecció',
		'Region Only': 'Només la regió',
		'Selected Clip': 'El tros seleccionat',
		'Make a selection first': 'Primer fes una selecció',
		'Load audio first': 'Primer obre un àudio',
		'Working...': 'Treballant…',
		'Average BPM': 'BPM mitjanes',
		'Nearest BPM': 'BPM més properes',
		'First Beat': 'Primer temps',
		'Play Track': 'Reprodueix la pista',
		'Stop Track': 'Atura la pista',
		'Play Both': 'Reprodueix-ho tot',
		'Timing Taps': 'Tocs de ritme',

		// --- Multipista ---
		'Channel 1': 'Canal 1',
		'Channel 2': 'Canal 2',
		'Channels': 'Canals',
		'Channel': 'Canal',
		'Add Channel': 'Afegeix un canal',
		'Add New Channel Here': 'Afegeix un canal aquí',
		'Delete Channel': 'Suprimeix el canal',
		'Remove Channel': 'Treu el canal',
		'Rename Channel': 'Canvia el nom del canal',
		'Move Channel Up': 'Puja el canal',
		'Move Channel Down': 'Baixa el canal',
		'Mute': 'Silencia',
		'Mute Channel': 'Silencia el canal',
		'Solo': 'Solo',
		'Solo Channel': 'Canal en solo',
		'Clear Mute': 'Treu els silenciats',
		'Clear Solo': 'Treu els solos',
		'Arm Channel': 'Prepara el canal per gravar',
		'Arm a channel to record': 'Prepara un canal per gravar',
		'Rec Trigger': 'Gravació',
		'Volume': 'Volum',
		'Volume Channel': 'Volum del canal',
		'Pan L/R': 'Panoràmica E/D',
		'Pan Channel': 'Panoràmica del canal',
		'Master Volume': 'Volum general',
		'Open in Editor': "Obre a l'editor",
		'Rename Clip': 'Canvia el nom del tros',
		'Duplicate Clip': 'Duplica el tros',
		'Copy Clip': 'Copia el tros',
		'Split Here': 'Talla aquí',
		'Delete Clip': 'Suprimeix el tros',
		'Turn Crossfade On': 'Activa la fosa encadenada',
		'Turn Crossfade Off': 'Desactiva la fosa encadenada',
		'Add Silence': 'Afegeix silenci',
		'Toggle Beat Markers': 'Marques de temps',
		'Snap to Beat Markers': 'Ajusta a les marques de temps',
		'Snap to zero crossing': 'Ajusta al pas per zero',
		'Time Signature': 'Compàs',
		'BEAT': 'TEMPS',
		'SNAP': 'AJUSTA',
		'Select a waveform box first': 'Primer selecciona un tros',
		'Move marker inside selected clip': 'Posa el marcador dins del tros seleccionat',
		'No overlap on this channel': 'No hi ha cap encavalcament en aquest canal',
		'Copy a clip or a selection first': 'Primer copia un tros o una selecció',
		'Copied clip': "S'ha copiat el tros",
		'Copied range': "S'ha copiat la selecció",
		'Pasted clip': "S'ha enganxat el tros",
		'Pasted to a new channel': "S'ha enganxat en un canal nou",
		'Duplicated clip': "S'ha duplicat el tros",
		'Recorded clip': "S'ha gravat el tros",
		'Loaded clip in editor': "S'ha obert el tros a l'editor",
		'Channel removed': "S'ha tret el canal",
		'Removed Crossfade': "S'ha tret la fosa encadenada",
		'New empty project': 'Projecte nou buit',
		'Start a new empty project? The current one will be cleared (you can still use Undo).': "Vols començar un projecte nou buit? S'esborrarà l'actual (es pot desfer).",
		'Start a new empty project? The current audio will be cleared.': "Vols començar un projecte nou buit? S'esborrarà l'àudio actual.",
		'Nothing to save': 'No hi ha res per desar',
		'Saved session': "S'ha desat la sessió",
		'Loaded session': "S'ha obert la sessió",
		'Could not save session': "No s'ha pogut desar la sessió",
		'Could not load session': "No s'ha pogut obrir la sessió",
		'Could not load all samples': "No s'han pogut carregar totes les mostres",

		// --- Descripcions de l'historial (Desfés / Refés) ---
		'Add Clip': 'Afegeix un tros',
		'Add Tracks': 'Afegeix pistes',
		'Move Clip': 'Mou el tros',
		'Trim Clip': 'Retalla el tros',
		'Split Clip': 'Talla el tros',
		'Fade Clip': 'Fosa del tros',
		'Crossfade Clip': 'Fosa encadenada',
		'Remove Crossfade': 'Treu la fosa encadenada',
		'Paste Clip': 'Enganxa el tros',
		'Record Clip': 'Grava un tros',
		'Open Clip': 'Obre el tros',
		'Reorder Channel': 'Reordena el canal',
		'Resize Channel': "Canvia l'alçada del canal",
		'New Project': 'Projecte nou',
		'Paste to New Channel ': 'Enganxa en un canal nou',
		'Normalize LUFS': 'Normalitza LUFS',
		'Normalize RMS': 'Normalitza RMS',
		'LUFS Normalize': 'Normalització LUFS',
		'RMS Normalize': 'Normalització RMS',
		'Applied Invert': "S'ha invertit la fase",
		'Applied Reverse': "S'ha invertit el sentit",
		'Applied Normalize': "S'ha normalitzat",
		'Applied RMS Normalize': "S'ha normalitzat (RMS)",
		'Applied LUFS Normalize': "S'ha normalitzat (LUFS)",

		// --- Finestres del mesclador i dels analitzadors ---
		'Master': 'General',
		'level': 'nivell',
		'pan': 'E/D',
		'UNDOCK': 'SEPARA',
		'DOCK': 'ACOBLA',
		'MULTITRACK MIXER': 'MESCLADOR MULTIPISTA',
		'OPEN MULTITRACK': 'OBRE EL MULTIPISTA',
		'FREQUENCY ANALYSER': 'ANALITZADOR DE FREQÜÈNCIES',
		'SPECTRUM ANALYSER': "ANALITZADOR D'ESPECTRE",
		'AudioMass - Multitrack Mixer': 'Mesclador multipista',
		'AudioMass - Frequency Analysis': 'Analitzador de freqüències',
		'AudioMass - Spectrum Analyzer': "Analitzador d'espectre",

		// --- Marcadors ---
		'Add Marker': 'Afegeix un marcador',
		'Add Marker Here': 'Afegeix un marcador aquí',
		'Clear Markers': 'Treu els marcadors',
		'Delete Marker': 'Suprimeix el marcador',
		'Move Marker': 'Mou el marcador',
		'Rename Marker': 'Canvia el nom del marcador',
		'Load Markers': 'Carrega els marcadors',
		'Marker': 'Marcador',
		'Marker Name': 'Nom del marcador',
		'Play From Here': "Reprodueix des d'aquí",

		// --- Avisos diversos ---
		'Selection too short': 'La selecció és massa curta',
		'Could not apply Speed': "No s'ha pogut canviar la velocitat",
		'Could not open local storage': "No s'ha pogut obrir l'emmagatzematge del navegador",
		'Could not download noise Reduction script': "No s'ha pogut baixar la reducció de soroll",
		'Currently unsupported on mobile': 'Ara per ara no funciona al mòbil',
		'unsupported on mobile': 'no funciona al mòbil',
		'Please allow pop-ups for AudioMass!': "Permet les finestres emergents per a l'editor!",
		'Successfully saved preset!': "S'ha desat el predefinit!",
		'Successfully updated preset!': "S'ha actualitzat el predefinit!",
		'Successfully deleted preset!': "S'ha suprimit el predefinit!",
		'Succesfully Stored': "S'ha desat correctament",
		'Downloading newer version': 'Baixant la versió nova',
		'Would you like to refresh the page to load the newer version?': 'Vols recarregar la pàgina per carregar la versió nova?',
		'Oops! Something is not right': 'Ui! Alguna cosa no va bé',
		'Open Offline Version?': 'Vols obrir la versió fora de línia?',
		'This will open a new window that will try to store a local version in your browser': "S'obrirà una finestra nova que intentarà desar una còpia de l'editor al navegador",
		'De-Click: nothing detected': 'Reducció de clics: no se n\'ha trobat cap',
		'Edit Repair: nothing detected': "Reparació d'unions: no s'ha trobat res",
		'File too large': 'El fitxer és massa gran',
		'File not found.': "No s'ha trobat el fitxer.",
		'db error': 'Error de la base de dades',
		'Could not analyze audio.': "No s'ha pogut analitzar l'àudio.",
		'Could not estimate tempo.': "No s'ha pogut calcular el tempo.",
		'Nothing to estimate': 'No hi ha res per calcular',
		'Loading tempo detector...': 'Carregant el detector de tempo…',
		'Analyzing audio. This can take a while on long files.': "Analitzant l'àudio. Amb fitxers llargs pot trigar una estona.",
		'Analyzing audio in the background. This can take a while.': "Analitzant l'àudio en segon pla. Pot trigar una estona.",
		'Preparing audio for background analysis...': "Preparant l'àudio per a l'anàlisi…",
		'STAND BY...': 'ESPERA…',

		// --- Benvinguda ---
		'Welcome to AudioMass': "Benvingut a l'editor d'àudio",
		'AudioMass is a free, open source, web-based Audio and Waveform Editor.': "AudioMass és un editor d'àudio gratuït i de codi obert que funciona al navegador.",
		'It runs entirely in the browser with no backend and no plugins required!': 'Funciona del tot al navegador, sense servidor ni complements!',
		'You can load any type of audio your browser supports and perform operations such as fade in, cut, trim, change the volume, and apply a plethora of audio effects.': "Hi pots obrir qualsevol àudio que el navegador entengui i fer-hi foses, retallar, ajustar el volum i aplicar-hi molts efectes.",
		'I hope you enjoy the little music pieces. I wrote them a long time ago :)': "Espero que t'agradin les peces musicals de mostra. Les vaig escriure fa temps :)",
		'Tips:': 'Consells:',
		'Please keep in mind that most key shortcuts rely on the': 'Tingues en compte que la majoria de dreceres de teclat fan servir la combinació',
		'Shift +': 'Maj +',
		'key': 'tecla',
		'combo. (eg Shift+Z for undo, Shift+C copy, Shift+X cut... etc )': '(per exemple, Maj+Z desfà, Maj+C copia, Maj+X retalla…)',
		'Check out the codebase on': 'Consulta el codi a',
		'(Optimized for desktop - sorry) ': '(Pensat per a ordinador)',
		'(Optimized for desktop - sorry)': '(Pensat per a ordinador)',
		'Please make sure your device is not in silent mode. You might need to physically flip the silent switch.': "Comprova que l'aparell no estigui en silenci.",
		'AudioMass - Audio Editor': "Editor d'àudio"
	};

	// Textos que porten una part variable (noms, xifres o temps).
	var R = [
		[/^(Undo|Redo)\s+(.+)$/, function ( m ) { return (m[1] === 'Undo' ? 'Desfés ' : 'Refés ') + tr ( m[2] ); }],
		[/^Applied (.+?)( \(fx\))?$/, function ( m ) { return 'Aplicat: ' + tr ( m[1] ); }],
		[/^Apply (.+) \(fx\)$/, function ( m ) { return 'Aplica: ' + tr ( m[1] ); }],
		[/^Applied :: (.+)$/, function ( m ) { return 'Aplicat: ' + tr ( m[1] ); }],
		[/^Applied Channel Change:\s*(.*)$/, function ( m ) { return 'Canvi de canals: ' + tr ( m[1] ); }],
		[/^(Cut|Delete) ::\s*(.*)$/, function ( m ) { return (m[1] === 'Cut' ? 'Retallat: ' : 'Suprimit: ') + m[2]; }],
		[/^Paste to (.+)$/, function ( m ) { return 'Enganxat a ' + m[1]; }],
		[/^Peak at (.+)$/, function ( m ) { return 'Pic a ' + m[1]; }],
		[/^Loop (.+)$/, function ( m ) { return 'Bucle ' + m[1]; }],
		[/^Added (\d+) clips?$/, function ( m ) { return m[1] === '1' ? "S'ha afegit 1 tros" : "S'han afegit " + m[1] + ' trossos'; }],
		[/^Channel (\d+)$/, function ( m ) { return 'Canal ' + m[1]; }],
		[/^(.+) to (.+)$/, function ( m ) { return /^[\d:.\s]+$/.test ( m[1] ) && /^[\d:.\s]+$/.test ( m[2] ) ? m[1] + ' a ' + m[2] : null; }],
		[/^Rendering failed:\s*(.*)$/, function ( m ) { return 'No s\'ha pogut processar: ' + m[1]; }],
		[/^De-Click: removed (.*)$/, function ( m ) { return 'Reducció de clics: ' + m[1]; }],
		[/^Edit Repair: smoothed (.*)$/, function ( m ) { return "Reparació d'unions: " + m[1]; }],
		[/^Loaded session: (.+)$/, function ( m ) { return "S'ha obert la sessió: " + m[1]; }],
		[/^Edit Custom Preset "(.*)"?$/, function ( m ) { return 'Edita el predefinit «' + m[1].replace (/"$/, '') + '»'; }],
		[/^Save Custom Preset for filter "(.*)"?$/, function ( m ) { return "Desa un predefinit per a l'efecte «" + m[1].replace (/"$/, '') + '»'; }]
	];

	function tr ( s ) {
		if (!s) return s;
		var k = s.replace (/[\s ]+/g, ' ').trim ();
		if (T.hasOwnProperty ( k )) return T[k];

		// Marques de casella (✔) al final
		var tick = k.match (/^(.*?)\s*✔$/);
		if (tick && T.hasOwnProperty ( tick[1] )) return T[tick[1]] + ' ✔';

		for (var i = 0; i < R.length; ++i) {
			var m = k.match ( R[i][0] );
			if (m) {
				var r = R[i][1]( m );
				if (r) return r;
			}
		}
		return null;
	}

	function textNode ( n ) {
		var v = n.nodeValue;
		if (!v || !/[A-Za-z]{2}/.test ( v )) return ;
		var p = n.parentNode;
		if (p && /^(SCRIPT|STYLE|TEXTAREA)$/.test ( p.nodeName )) return ;
		var t = tr ( v );
		if (t === null || t === undefined) return ;
		var lead = v.match (/^[\s ]*/)[0];
		var trail = v.match (/[\s ]*$/)[0];
		var nv = lead + t + trail;
		if (nv !== v) n.nodeValue = nv;
	}

	var ATTRS = ['title', 'placeholder', 'aria-label'];
	function attrs ( el ) {
		for (var i = 0; i < ATTRS.length; ++i) {
			var a = ATTRS[i];
			if (!el.hasAttribute || !el.hasAttribute ( a )) continue;
			var v = el.getAttribute ( a );
			var t = tr ( v );
			if (t && t !== v) el.setAttribute ( a, t );
		}
	}

	function walk ( n ) {
		if (n.nodeType === 3) { textNode ( n ); return ; }
		if (n.nodeType !== 1) return ;
		if (/^(SCRIPT|STYLE|TEXTAREA)$/.test ( n.nodeName )) return ;
		attrs ( n );
		for (var c = n.firstChild; c; c = c.nextSibling) walk ( c );
	}

	// Finestres del navegador (avisos i confirmacions)
	['alert', 'confirm', 'prompt'].forEach (function ( f ) {
		var orig = w[f];
		if (!orig) return ;
		w[f] = function ( msg ) {
			var args = Array.prototype.slice.call ( arguments );
			var t = tr ( String ( msg || '' ) );
			if (t) args[0] = t;
			return orig.apply ( w, args );
		};
	});

	// Textos que surten del full d'estils (CSS), no de la pàgina
	var CSS = '.icon-clearsel:before{content:"treu la selecció"}' +
		'@media only screen and (max-width:864px){.icon-clearsel:before{content:"treu"}}' +
		'.pk_mt_pan:before{content:"E/D"}';

	function start () {
		d.documentElement.setAttribute ('lang', 'ca');
		var st = d.createElement ('style');
		st.textContent = CSS;
		d.head && d.head.appendChild ( st );
		walk ( d.body );
		var t = tr ( d.title );
		if (t) d.title = t;

		new MutationObserver (function ( list ) {
			for (var i = 0; i < list.length; ++i) {
				var m = list[i];
				if (m.type === 'characterData') textNode ( m.target );
				else if (m.type === 'attributes') attrs ( m.target );
				else for (var j = 0; j < m.addedNodes.length; ++j) walk ( m.addedNodes[j] );
			}
		}).observe (d.body, {
			subtree: true, childList: true, characterData: true,
			attributes: true, attributeFilter: ATTRS
		});
	}

	if (d.body) start ();
	else d.addEventListener ('DOMContentLoaded', start);

	w.PKTradueix = tr;
})( window, document );
