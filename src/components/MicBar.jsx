import React from 'react'

export default class MicBar extends React.Component {
  state = {}
  componentWillMount = () => {
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = new AudioContext()
    // Attempt to get audio input
    try {
      // monkeypatch getUserMedia
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      // ask for an audio input
      navigator.getUserMedia(
        {
          "audio": {
            "mandatory": {
              "googEchoCancellation": "false",
              "googAutoGainControl": "false",
              "googNoiseSuppression": "false",
              "googHighpassFilter": "false"
            },
            "optional": []
          },
        }, this.gotStream, () => alert('Mic stream generation failed.'));
    } catch (e) {
      alert('getUserMedia threw exception :' + e);
    }
  }
  gotStream = stream => {
    // Create an AudioNode from the stream.
    const mediaStreamSource = this.audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    this.meter = createAudioMeter(this.audioContext);
    mediaStreamSource.connect(this.meter);
  }
  componentDidMount = () => {
    this.micOnFrom = new Date().getTime()
    setInterval(() => {
      if (!this.meter)
        return
      if (this.meter.volume > 0.001)
        this.micOnFrom = new Date().getTime()
      this.setState({ micOffAlert: new Date().getTime() - this.micOnFrom > 60000 })
    }, 1000)
  }
  render = () =>
    this.state.micOffAlert ?
      <div style={{ fontSize: '20px', color: '#E57373' }}>
        =====麥克風是不是沒開？=====
      </div>
      : null
}