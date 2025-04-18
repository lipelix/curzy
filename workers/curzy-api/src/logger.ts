export const logger =
  (request: Request, env?: any, context?: any, data?: any) =>
  (logMessage: string, logLevel: string = "INFO") => {
    const levelIcon: { [key: string]: string } = {
      ERROR: "🔥 ",
      INFO: "",
      WARNING: "❗ ",
    };

    console.log(
      new Date(),
      `[method="${request.method}" url="${request.url}" host="${request.headers.get(
        "host"
      )}" referer="${request.headers.get(
        "referer"
      )}" userAgent="${request.headers.get("user-agent")}" city="${
        request.cf?.city
      }" country="${request.cf?.country}" contentLength="${request.headers.get(
        "content-length"
      )}" cfRay="${request.headers.get("cf-ray")}"] ${
        levelIcon[logLevel]
      }${logMessage}`
    );
  };
