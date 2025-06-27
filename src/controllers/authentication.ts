import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';

export const createGuestAccount = catchErrors(async (_req, res) => {
  try {
    // Create guest account
    const user = await createAccount();
    
    // Generate authentication token
    const authToken = signToken({ sub: user.id });

    // Respond with the auth token
    res.respond({
      authToken,
    });
  } catch (error) {
    console.error('Error during guest account creation:', error);
    res.status(500).json({ message: 'Failed to create guest account', error: error.message });
  }
});
