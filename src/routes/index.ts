/* Lightweight route definitions (framework-agnostic)
   These modules export handlers that can be wired into Next.js API routes
   or any serverless function. Keep routing thin; controllers contain logic.
*/
import * as authController from '../controllers/authController';

export const routes = {
    auth: {
        spotify: authController.startSpotifyAuth,
        youtube: authController.startYouTubeAuth,
    },
};

export default routes;
