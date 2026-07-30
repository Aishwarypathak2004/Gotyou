import React from "react";

const ReturnPolicy = () => {
  return (
    <>
      <style>{`
      *{
        box-sizing:border-box;
      }

      .policy-page{
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
        border-radius:18px;
        padding:35px;
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

      .card ul{
        margin-top:15px;
        padding-left:22px;
      }

      .card li{
        color:#475569;
        margin-bottom:10px;
        line-height:1.8;
      }

      .notice{
        background:#eff6ff;
        border-left:6px solid #2563eb;
        padding:25px;
        border-radius:14px;
        margin-top:35px;
      }

      .notice h3{
        color:#1e40af;
        margin-bottom:12px;
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
        max-width:700px;
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
          font-size:1.4rem;
        }

      }
      `}</style>

      <div className="policy-page">

        <section className="hero">
          <h1>Return & Refund Policy</h1>

          <p>
            Customer satisfaction is our priority. This Return & Refund
            Policy explains the conditions under which products may be
            returned, exchanged, or refunded after purchase.
          </p>
        </section>

        <section className="section">

          <div className="container">

            <div className="card">
              <h2>Return Eligibility</h2>

              <p>
                Most products purchased through GotYOU may be eligible
                for return within <strong>7 days</strong> of delivery,
                provided they are unused, undamaged, and returned in
                their original packaging with all accessories,
                manuals, and invoices.
              </p>
            </div>

            <div className="card">
              <h2>Items That Cannot Be Returned</h2>

              <ul>
                <li>Personal care or hygiene products.</li>
                <li>Products damaged due to misuse.</li>
                <li>Customized or personalized products.</li>
                <li>Digital products or downloadable content.</li>
                <li>Products marked as non-returnable during purchase.</li>
              </ul>
            </div>

            <div className="card">
              <h2>Refund Process</h2>

              <p>
                Once your returned product has been received and
                inspected, we will notify you regarding the approval
                or rejection of your refund request. Approved refunds
                will be processed through the original payment method
                within a reasonable processing period, depending on
                your bank or payment provider.
              </p>
            </div>

            <div className="card">
              <h2>Exchange Policy</h2>

              <p>
                If you receive a defective, damaged, or incorrect
                product, you may request a replacement instead of a
                refund. Exchanges are subject to product availability.
                If the requested item is unavailable, an alternative
                resolution or refund may be provided.
              </p>
            </div>

            <div className="card">
              <h2>Cancellation Policy</h2>

              <p>
                Orders may be cancelled before they are shipped. Once
                an order has been dispatched, cancellation may not be
                possible. In such cases, customers should follow the
                standard return procedure after delivery.
              </p>
            </div>

            <div className="card">
              <h2>Damaged or Incorrect Products</h2>

              <p>
                If your order arrives damaged, defective, or different
                from what you ordered, please report the issue as soon
                as possible along with supporting photographs. We will
                review the request and provide an appropriate solution.
              </p>
            </div>

            <div className="card">
              <h2>Shipping Charges</h2>

              <p>
                Shipping charges paid during the original purchase are
                generally non-refundable unless the return is caused by
                an error on our part or the product delivered is
                defective or incorrect.
              </p>
            </div>

            <div className="notice">

              <h3>Important Note</h3>

              <p>
                GotYOU reserves the right to refuse returns or refunds
                that do not satisfy the conditions outlined in this
                policy. We recommend carefully reviewing product
                details before placing an order to ensure a smooth
                shopping experience.
              </p>

            </div>

          </div>

        </section>

        <section className="footer">

          <h2>We're Here to Help</h2>

          <p>
            Our customer support team is committed to resolving any
            issues related to your orders quickly and fairly. Thank
            you for shopping with GotYOU.
          </p>

        </section>

      </div>
    </>
  );
};

export default ReturnPolicy;