// WebAuthn Fingerprint Authentication for Admin
// This provides biometric authentication using the device's fingerprint sensor

export interface FingerprintCredential {
  id: string;
  publicKey: string;
  createdAt: Date;
}

export async function registerFingerprint(username: string): Promise<boolean> {
  try {
    if (!window.PublicKeyCredential) {
      console.error('WebAuthn not supported');
      return false;
    }

    // Convert username to buffer
    const userIdBuffer = new TextEncoder().encode(username);
    const userId = new Uint8Array(userIdBuffer).slice(0, 32);

    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: challenge,
      rp: {
        name: 'VOR Admin Portal',
        id: window.location.hostname,
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' }, // ES256
        { alg: -257, type: 'public-key' }, // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
      },
      timeout: 60000,
    };

    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    });

    if (!credential) {
      console.error('Failed to create credential');
      return false;
    }

    // Store credential (in production, send to server)
    const credentialData = {
      id: credential.id,
      publicKey: JSON.stringify(credential),
      createdAt: new Date(),
    };

    localStorage.setItem('fingerprintCredential', JSON.stringify(credentialData));
    
    return true;
  } catch (error) {
    console.error('Fingerprint registration error:', error);
    return false;
  }
}

export async function authenticateWithFingerprint(): Promise<boolean> {
  try {
    if (!window.PublicKeyCredential) {
      console.error('WebAuthn not supported');
      return false;
    }

    const storedCredential = localStorage.getItem('fingerprintCredential');
    if (!storedCredential) {
      console.error('No fingerprint registered');
      return false;
    }

    const credentialData: FingerprintCredential = JSON.parse(storedCredential);
    const credential = JSON.parse(credentialData.publicKey);

    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge: challenge,
      timeout: 60000,
      rpId: window.location.hostname,
      allowCredentials: [
        {
          id: new Uint8Array((credential as any).rawId.match(/[\da-f]{2}/gi)!.map((h: string) => parseInt(h, 16))),
          type: 'public-key',
        },
      ],
      userVerification: 'required',
    };

    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    });

    if (!assertion) {
      console.error('Failed to authenticate');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Fingerprint authentication error:', error);
    return false;
  }
}

export function isFingerprintRegistered(): boolean {
  return !!localStorage.getItem('fingerprintCredential');
}

export function clearFingerprint(): void {
  localStorage.removeItem('fingerprintCredential');
}
