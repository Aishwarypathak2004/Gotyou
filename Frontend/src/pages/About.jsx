import React from "react";

const About = () => {
  return (
    <>
      <style>{`
      *{
        box-sizing:border-box;
      }

      .about-page{
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
        max-width:750px;
        margin:auto;
        line-height:1.8;
        opacity:.95;
      }

      .container{
        width:min(1200px,92%);
        margin:auto;
      }

      .section{
        padding:80px 0;
      }

      .section-title{
        text-align:center;
        margin-bottom:50px;
      }

      .section-title h2{
        font-size:2.4rem;
        color:#0f172a;
      }

      .section-title p{
        color:#64748b;
        margin-top:10px;
      }

      .story{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
        gap:50px;
        align-items:center;
      }

      .story img{
        width:100%;
        border-radius:20px;
        box-shadow:0 20px 40px rgba(0,0,0,.08);
      }

      .story h3{
        margin-bottom:18px;
        font-size:2rem;
      }

      .story p{
        color:#475569;
        line-height:1.8;
        margin-bottom:15px;
      }

      .features{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
        gap:25px;
      }

      .feature{
        background:#fff;
        border-radius:18px;
        padding:35px;
        text-align:center;
        transition:.3s;
        box-shadow:0 10px 30px rgba(0,0,0,.05);
      }

      .feature:hover{
        transform:translateY(-8px);
      }

      .feature span{
        font-size:3rem;
      }

      .feature h3{
        margin:20px 0 10px;
      }

      .feature p{
        color:#64748b;
        line-height:1.7;
      }

      .stats{
        margin-top:70px;
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
        gap:25px;
      }

      .stat{
        background:#2563eb;
        color:#fff;
        padding:35px;
        border-radius:18px;
        text-align:center;
      }

      .stat h2{
        font-size:2.5rem;
      }

      .stat p{
        color:#dbeafe;
      }

      .cta{
        background:#0f172a;
        color:#fff;
        text-align:center;
        padding:80px 20px;
      }

      .cta h2{
        font-size:2.4rem;
        margin-bottom:20px;
      }

      .cta p{
        max-width:650px;
        margin:auto;
        line-height:1.8;
        color:#cbd5e1;
      }

      .cta button{
        margin-top:35px;
        padding:14px 32px;
        border:none;
        border-radius:12px;
        background:#2563eb;
        color:#fff;
        font-size:1rem;
        cursor:pointer;
        transition:.3s;
      }

      .cta button:hover{
        background:#1d4ed8;
        transform:translateY(-3px);
      }

      @media(max-width:768px){

        .hero h1{
          font-size:2.3rem;
        }

        .section-title h2{
          font-size:2rem;
        }

        .story h3{
          font-size:1.8rem;
        }

      }

      `}</style>

      <div className="about-page">

        <section className="hero">
          <h1>About GotYOU</h1>
          <p>
            GotYOU is your trusted online shopping destination built to make
            discovering, comparing, and purchasing products simple, secure,
            and enjoyable. We believe shopping should be fast, affordable,
            and stress-free.
          </p>
        </section>

        <section className="section">
          <div className="container">

            <div className="story">

              <div>
                <img
                  src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900"
                  alt="Shopping"
                />
              </div>

              <div>
                <h3>Our Story</h3>

                <p>
                  GotYOU was created with one simple goal: provide customers
                  with a reliable shopping experience where quality products,
                  transparent pricing, and secure payments come together in
                  one place.
                </p>

                <p>
                  Whether you're searching for everyday essentials or the
                  latest trends, our platform helps you shop with confidence
                  through an intuitive interface and smooth checkout process.
                </p>

                <p>
                  Every feature has been designed to save your time because
                  life's already full of enough tabs open in your browser.
                </p>

              </div>

            </div>

          </div>
        </section>

        <section className="section">

          <div className="container">

            <div className="section-title">
              <h2>Why Shop With Us?</h2>
              <p>Everything you need for a seamless shopping experience.</p>
            </div>

            <div className="features">

              <div className="feature">
                <span>🛍️</span>
                <h3>Quality Products</h3>
                <p>
                  Carefully selected products from trusted brands and sellers.
                </p>
              </div>

              <div className="feature">
                <span>🚚</span>
                <h3>Fast Delivery</h3>
                <p>
                  Quick and reliable shipping to ensure your orders arrive on
                  time.
                </p>
              </div>

              <div className="feature">
                <span>🔒</span>
                <h3>Secure Payments</h3>
                <p>
                  Multiple payment methods backed by secure transactions and
                  data protection.
                </p>
              </div>

              <div className="feature">
                <span>💬</span>
                <h3>Customer Support</h3>
                <p>
                  Friendly support ready to help whenever you need assistance.
                </p>
              </div>

            </div>

            <div className="stats">

              <div className="stat">
                <h2>10K+</h2>
                <p>Happy Customers</p>
              </div>

              <div className="stat">
                <h2>5K+</h2>
                <p>Products Listed</p>
              </div>

              <div className="stat">
                <h2>99%</h2>
                <p>Customer Satisfaction</p>
              </div>

              <div className="stat">
                <h2>24/7</h2>
                <p>Customer Support</p>
              </div>

            </div>

          </div>

        </section>

        <section className="cta">

          <h2>Ready to Start Shopping?</h2>

          <p>
            Explore thousands of products across multiple categories and enjoy
            a modern shopping experience built around convenience, security,
            and value.
          </p>

          <button>Shop Now</button>

        </section>

      </div>
    </>
  );
};

export default About;