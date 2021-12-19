import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { GA4Id } from '../components/providers/TrackingProvider';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <script
            type="text/javascript"
            src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            async
          ></script>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4Id}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
