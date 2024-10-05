const { useState, useEffect } = React;

export function AudioRecorder({ onSave }) {
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [audioURL, setAudioURL] = useState('')

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream)

                recorder.ondataavailable = (event) => {
                    const url = URL.createObjectURL(event.data)
                    setAudioURL(url)
                    if (onSave) {
                        onSave(url)
                    }
                };

                recorder.start()
                setMediaRecorder(recorder)
                setIsRecording(true)
            })
            .catch((error) => {
                console.error('Error accessing audio devices:', error)
            })
    }

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setIsRecording(false)
        }
    };

    useEffect(() => {
        return () => {
            if (mediaRecorder) {
                mediaRecorder.stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [mediaRecorder])

    return (
        <div className="audio-recorder">
            {isRecording ? (
                <div>
                    <button onMouseUp={stopRecording} onMouseLeave={stopRecording}>
                        Stop Recording
                    </button>
                    <audio src={audioURL} controls />
                </div>
            ) : (
                <button onMouseDown={startRecording}>
                    Start Recording
                </button>
            )}
        </div>
    )
}
