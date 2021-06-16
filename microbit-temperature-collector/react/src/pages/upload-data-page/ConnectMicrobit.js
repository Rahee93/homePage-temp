class LineBreakTransformer {
  constructor() {
    this.container = "";
  }

  transform(chunk, controller) {
    this.container += chunk;
    const lines = this.container.split("\r\n");
    this.container = lines.pop();
    lines.forEach((line) => controller.enqueue(line));

    //if we receive -1, then that means we have received all data
    if(this.container === '-1') {
      controller.enqueue(this.container);
      this.container = '';
    }
  }

  flush(controller) {
    controller.enqueue(this.container);
  }
}

export const connectMicrobit = async () => {
      // filter the available devices connected to the computer that match the vendor id of a microbit only
      const filter = {usbVendorId: 0x0d28};
      // Connect to the microbit with user's selected microbit device
      // if the browser does not support serial web API, then return null
      if(!navigator.serial) {
        return null;
      }
      const port = await navigator.serial.requestPort({filters: [filter]});
      // - Wait for the port to open.
      await port.open({ baudRate: 115200 });
      const controller = new AbortController();
      return {
        controller,
        reader: port.readable
          .pipeThrough(new window.TextDecoderStream())
          .pipeThrough(new window.TransformStream(new LineBreakTransformer()), {signal: controller.signal})
          .getReader(),
        port
      }
  };