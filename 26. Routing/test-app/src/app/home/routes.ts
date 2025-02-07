import { HomeRoutes } from '../router.service';
import { ProfileComponent } from './profile/profile.component';
import { DirectorContactsComponent } from './director-contacts/director-contacts.component';

export default [
    {
        path: HomeRoutes.PROFILE,
        // component: ProfileComponent,
        loadComponent: () =>
            import('./profile/profile.component')
            .then(m => m.ProfileComponent)
    },
    {
        path: HomeRoutes.DIRECTOR,
        component: DirectorContactsComponent,
    },
]
