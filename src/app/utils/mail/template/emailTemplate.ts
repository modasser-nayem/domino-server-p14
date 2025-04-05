class EmailTemplate {
  constructor() {}

  public generateForgotPassEmail(
    name: string,
    token: string,
    resetUrl: string,
  ) {
    const html = `
          <!DOCTYPE html>
          <html lang="en">
      
          <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
              <title>Welcome</title>
              <style>
                  body {
                      font-family: "Open Sans", sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f4f4f4;
                  }
    
                  .container {
                      width: 80%;
                      margin: auto;
                      overflow: hidden;
                  }
    
                  main {
                      padding: 20px 0;
                  }
    
                  footer {
                      background: #390535;
                      color: #ffffff;
                      text-align: center;
                      padding: 10px 0;
                  }
              </style>
          </head>
      
          <body>
        
              <main>
                  <div class="container">
                      <h2>Hello ${name},</h2>
                      <p>
                          You try to forgot your domino account password. Click the link below to reset your password:
                      </p>
                      <a href="${resetUrl}/?token=${token}">Reset Password </a>
                  </div>
              </main>
          </body>
      
          </html>
          `;
    return html;
  }
}

const emailTemplate = new EmailTemplate();

export default emailTemplate;
