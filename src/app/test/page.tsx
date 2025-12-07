/**
 * Simple diagnostic page that doesn't require any environment variables
 * Use this to test if Vercel is deploying your code correctly
 * Visit: https://stripe-escrow-market.vercel.app/test
 */

export default function TestPage() {
  const buildTime = new Date().toISOString();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1a202c'
        }}>
          ✅ Deployment Successful!
        </h1>

        <div style={{
          padding: '20px',
          background: '#f7fafc',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
            <strong>Status:</strong> Code is deployed correctly
          </p>
          <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
            <strong>Build Time:</strong> {buildTime}
          </p>
          <p style={{ margin: '0', fontSize: '16px' }}>
            <strong>Branch:</strong> Latest code from GitHub
          </p>
        </div>

        <div style={{
          background: '#fff5f5',
          border: '2px solid #fc8181',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#c53030'
          }}>
            ⚠️ Why You're Not Seeing the Main Page
          </h2>
          <p style={{ margin: '0 0 10px 0', lineHeight: '1.6' }}>
            The main page (<code>/</code>) requires a <strong>DATABASE_URL</strong> to be set in your Vercel environment variables. Without it, the app crashes at runtime.
          </p>
          <p style={{ margin: '0', lineHeight: '1.6' }}>
            This test page works because it doesn't need any database or environment variables.
          </p>
        </div>

        <div style={{
          background: '#f0fff4',
          border: '2px solid #68d391',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#2f855a'
          }}>
            📝 Next Steps
          </h2>
          <ol style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Go to your Vercel project settings</li>
            <li>Add the required environment variables (see <code>VERCEL_DEPLOY.md</code>)</li>
            <li>Redeploy the application</li>
            <li>The full SecureEscrow landing page will appear!</li>
          </ol>
        </div>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{
            margin: '0',
            fontSize: '14px',
            color: '#718096',
            textAlign: 'center'
          }}>
            Deployment Guide: Check <code>VERCEL_DEPLOY.md</code> in your repository
          </p>
        </div>
      </div>
    </div>
  );
}
