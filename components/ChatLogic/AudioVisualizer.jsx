"use client";
import { useEffect, useRef } from "react";

const AudioVisualizer = ({ isMousedown }) => {
  const canvasRef = useRef(null);
  let streamRef = useRef(null);
  let recorderRef = useRef(null);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    const canvas = canvasRef.current;
    const HEIGHT = canvas.height;
    const WIDTH = canvas.width;
    const ctx = canvas.getContext("2d");
    let bufferLength;

    const initAudio = async () => {
      try {
        // 获取用户设备的麦克风输入流。
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // // 创建 MediaRecorder 对象，将音频数据录制为 WAV 格式
        // const recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
        // recorderRef.current = recorder

        // // 监听录制完成事件，将录制后的 Blob 对象保存为文件
        // recorder.addEventListener('dataavailable', (event) => {
        //   const blob = event.data;
        //   const url = URL.createObjectURL(blob);
        // })

        // // 开始录制音频数据
        // recorder.start();

        streamRef.current = stream;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();

        analyser.fftSize = 2048;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // 创建音频流接口
        const source = audioContext.createMediaStreamSource(stream);
        // 接口连接分析器
        source.connect(analyser);
        draw();
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };
    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      let barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
        ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    // 当放开鼠标按钮时停止录制
    if (isMousedown) {
      initAudio()
    } 
    // else {
    //   const recorder = recorderRef.current
    //   if(recorder) recorder.stop()
    // }


    return () => {
      const stream = streamRef.current;
      if (audioContext) {
        audioContext.close();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isMousedown]);

  return <canvas ref={canvasRef} className="h-full w-full rounded-lg" />

  
};
export default AudioVisualizer;
