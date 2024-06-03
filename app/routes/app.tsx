import { Sidebar } from '~/components/sidebar';
import { Outlet, json } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { prefCookies } from '~/lib/cookies.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefCookies.parse(cookieHeader)) || {};
  return json({ sidebarExpanded: cookie.sidebarExpanded });
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefCookies.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const isExpanded = formData.get('sidebarExpanded') === 'true';
  cookie.sidebarExpanded = isExpanded;

  return json(isExpanded, {
    headers: {
      'Set-Cookie': await prefCookies.serialize(cookie),
    },
  });
}

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar></Sidebar>

      <div className="app-layout_content">
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
