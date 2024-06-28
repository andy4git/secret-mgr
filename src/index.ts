import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

// Initialize the Secrets Manager client
const client = new SecretsManagerClient({ region: "ca-central-1" });

async function getSecretValue( secretName : string ) {
  try {
    const command = new GetSecretValueCommand({
      SecretId: secretName,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    });
    const response = await client.send(command);

    // Extract the secret value
    const secret = response.SecretString;
    return secret;
  } 
  catch (error) {
    console.error("Error fetching secret:", error);
    throw error;
  }
}

// Example usage
const secretName = "jwtsignerdev-1";

getSecretValue(secretName)
  .then((secretValue) => console.log("Secret:", secretValue))
  .catch((error) => console.error("Error:", error));