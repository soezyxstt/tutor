import { createTutorWorker } from '@tutor/core/worker';

export { TutorAdminState } from '@tutor/core/worker';

export default createTutorWorker({ admin: true });
