import './style.css'

// Importar módulos necesarios "Camera Kit"
import { bootstrapCameraKit, createMediaStreamSource, Transform2D} from "@snap/camera-kit";

// Crear una nueva instancia para la cámara
(async function(){
  // API KEY
    var cameraKit = await bootstrapCameraKit({apiToken:'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzEyMDgzOTczLCJzdWIiOiI0YWQ2NDVmNC1mYzdhLTRkY2EtYjdlZS1jNjcxNDFkZTIzMWZ-U1RBR0lOR345ODk3MjIzYy01ZDlmLTQ4YTEtYTM5NC00ZTVkZmQyODMxMjAifQ.sBmNx3OXhDTzqEl0c3RVxur7HorgYI3xjhEL6wXERFA'})
    
    const session = await cameraKit.createSession();
    document.getElementById('canvas').replaceWith(session.output.live)
    console.log(session)
    // const {lenses} = await cameraKit.lensRepository.loadLensGroups(['05f540c5-46b3-47ef-a240-fd84ec2c1950'])
    // session.applyLens(lenses[19])
    const lens = await cameraKit.lensRepository.loadLens('530c79e7-af4a-40d9-9ad7-d440ea9fcd7d','88adf67a-efbc-4f3f-8316-7a8f558b92eb') // ID&GROUP
    console.log(lens)
    session.applyLens(lens)

    let mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      //facingMode: 'environment' // para iluminar la escena con la cámara trasera
    });

    const source = createMediaStreamSource(mediaStream,{
        transform: Transform2D.MirrorX,
        cameraType: 'front'  // en caso de tener cámara trasera se cambia a "back"
    });

    await session.setSource(source)
    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play();

})();


