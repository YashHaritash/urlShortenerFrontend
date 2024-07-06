import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function CustomShortenPage() {
  const [fullUrl, setFullUrl] = useState("");
  const [customShortUrl, setCustomShortUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      if (fullUrl.length === 0 || customShortUrl.length === 0) {
        return;
      }

      const response = await fetch(
        "https://urlshortenerbackend-viev.onrender.com/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full: fullUrl,
            custom: customShortUrl,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message ? data.message : "Something Went Wrong");
        return;
      }

      const data = await response.json();
      setShortUrl(
        `https://urlshortenerbackend-viev.onrender.com/${data.shortUrl}`
      );
      toast.success(data.message ? data.message : "Done");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong");
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shortUrl).then(
      () => {
        console.log("Text copied to clipboard");
        toast.success("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy text");
      }
    );
  };

  return (
    <>
      <div className="row mx-sm-3 my-5">
        <div className="col-sm-2 col-xs-1"></div>
        <div className="col-sm-8 col-xs-10" id="container">
          <h1 className="text-center my-4" id="top">
            <i>Tinga Custom URL</i>
          </h1>
          <form className="form">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full URL"
                value={fullUrl}
                onChange={(e) => setFullUrl(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Custom Short URL (optional)"
                value={customShortUrl}
                onChange={(e) => setCustomShortUrl(e.target.value)}
              />
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary mb-2 mx-2"
                id="shorten"
                onClick={handleShorten}
              >
                SHORTEN
              </button>
              <button
                type="button"
                className="btn btn-warning mb-2 mx-2"
                id="copy"
                onClick={handleCopy}
                disabled={!shortUrl}
              >
                COPY
              </button>
            </div>
          </form>
          {shortUrl && (
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                value={shortUrl}
                readOnly
              />
            </div>
          )}
        </div>
        <div className="col-sm-2 col-xs-1"></div>
      </div>
      <Toaster />
    </>
  );
}

export default CustomShortenPage;
