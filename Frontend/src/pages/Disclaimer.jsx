import React from "react";

const Disclaimer = () => {
  return (
    <>
      <style>{`
      *{
        box-sizing:border-box;
      }

      .disclaimer-page{
        background:#f8fafc;
        min-height:100vh;
        font-family:Poppins,sans-serif;
        color:#1e293b;
      }

      .hero{
        background:linear-gradient(135deg,#2563eb,#1d4ed8);
        color:#fff;
        text-align:center;
        padding:90px 20px;
      }

      .hero h1{
        font-size:3rem;
        margin-bottom:15px;
      }

      .hero p{
        max-width:760px;
        margin:auto;
        line-height:1.8;
        opacity:.95;
      }

      .container{
        width:min(1100px,92%);
        margin:auto;
      }

      .section{
        padding:80px 0;
      }

      .card{
        background:#fff;
        padding:35px;
        border-radius:18px;
        margin-bottom:30px;
        box-shadow:0 12px 30px rgba(0,0,0,.05);
        transition:.3s;
      }

      .card:hover{
        transform:translateY(-5px);
      }

      .card h2{
        color:#2563eb;
        margin-bottom:18px;
        font-size:1.6rem;
      }

      .card p{
        color:#475569;
        line-height:1.9;
      }

      .notice{
        background:#eff6ff;
        border-left:6px solid #2563eb;
        padding:25px;
        border-radius:14px;
        margin-top:40px;
      }

      .notice h3{
        margin-bottom:12px;
        color:#1e40af;
      }

      .notice p{
        color:#475569;
        line-height:1.8;
      }

      .footer{
        background:#0f172a;
        color:#fff;
        text-align:center;
        padding:60px 20px;
      }

      .footer h2{
        margin-bottom:15px;
      }

      .footer p{
        color:#cbd5e1;
        max-width:650px;
        margin:auto;
        line-height:1.8;
      }

      @media(max-width:768px){

        .hero h1{
          font-size:2.3rem;
        }

        .card{
          padding:25px;
        }

        .card h2{
          font-size:1.35rem;
        }

      }
      `}</style>

      <div className="disclaimer-page">

        <section className="hero">
          <h1>Disclaimer</h1>

          <p>
            Please read this disclaimer carefully before using GotYOU.
            By accessing or using our platform, you acknowledge and agree
            to the terms described below.
          </p>
        </section>

        <section className="section">
          <div className="container">

            <div className="card">
              <h2>General Information</h2>

              <p>
                The information, product descriptions, images, pricing,
                and other content available on GotYOU are provided for
                general informational and shopping purposes only. While
                we strive to keep all information accurate and up to date,
                we do not guarantee the completeness, accuracy, or
                reliability of any content displayed on this website.
              </p>
            </div>

            <div className="card">
              <h2>Product Availability</h2>

              <p>
                Product availability, prices, offers, and specifications
                may change without prior notice. Some products may become
                unavailable or discontinued after they have been displayed
                on the platform. We reserve the right to update or remove
                products whenever necessary.
              </p>
            </div>

            <div className="card">
              <h2>External Links</h2>

              <p>
                Our website may contain links to third-party websites or
                services for your convenience. GotYOU does not control,
                endorse, or accept responsibility for the content,
                policies, or practices of any external websites.
              </p>
            </div>

            <div className="card">
              <h2>Limitation of Liability</h2>

              <p>
                GotYOU shall not be held liable for any direct, indirect,
                incidental, or consequential damages arising from the use
                of this website, including interruptions, delays,
                inaccuracies, or temporary unavailability of services.
                Users access and use the platform at their own discretion.
              </p>
            </div>

            <div className="card">
              <h2>Intellectual Property</h2>

              <p>
                All trademarks, logos, graphics, text, and other content
                displayed on this platform belong to their respective
                owners unless otherwise stated. Unauthorized copying,
                reproduction, or distribution of any material is
                prohibited without prior permission.
              </p>
            </div>

            <div className="card">
              <h2>Updates to this Disclaimer</h2>

              <p>
                We reserve the right to modify or update this disclaimer
                at any time without prior notice. Continued use of the
                platform after changes have been made constitutes
                acceptance of the revised disclaimer.
              </p>
            </div>

            <div className="notice">
              <h3>Important Notice</h3>

              <p>
                By using GotYOU, you agree that you have read,
                understood, and accepted this disclaimer. If you do not
                agree with any part of this disclaimer, you should
                discontinue the use of our services.
              </p>
            </div>

          </div>
        </section>

        <section className="footer">

          <h2>Thank You for Choosing GotYOU</h2>

          <p>
            We are committed to providing a secure, transparent, and
            reliable online shopping experience while continuously
            improving our platform for every customer.
          </p>

        </section>

      </div>
    </>
  );
};

export default Disclaimer;