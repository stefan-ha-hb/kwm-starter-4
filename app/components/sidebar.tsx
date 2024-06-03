import { ChevronLeft, Home, LayoutGrid, ListMusic } from 'lucide-react';
import { PlaylistNav } from './playlist-nav';
import { Link, useLoaderData, useSubmit } from '@remix-run/react';
import { useLocalStorage } from 'usehooks-ts';
import { loader } from '~/routes/app';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useLocalStorage('sidebar', true, { initializeWithValue: false });
  const handleExpandToggle = () => setIsExpanded(!isExpanded);

  //   const { sidebarExpanded } = useLoaderData<typeof loader>();
  //   const isExpanded = sidebarExpanded;

  //   const submit = useSubmit();
  //   const handleExpandToggle = () => {
  //     submit(
  //       // This submits to the app action
  //       {
  //         sidebarExpanded: !sidebarExpanded,
  //       },
  //       { method: 'POST' }
  //     );
  //   };

  return (
    <div className="sidebar" aria-expanded={isExpanded}>
      <section>
        <h2 className="mb-2">Discover</h2>

        <div className="space-y-1">
          <Link to="/app" className="sidebar_link">
            <Home />
            Home
          </Link>

          <Link to="/app/library" className="sidebar_link">
            <LayoutGrid />
            Library
          </Link>

          <Link to="/app/playlists" className="sidebar_link">
            <ListMusic />
            Your Playlists
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-2">Playlists</h2>

        <PlaylistNav></PlaylistNav>
      </section>

      <button type="button" className="sidebar_toggle" onClick={handleExpandToggle}>
        <ChevronLeft strokeWidth={1.5} height={20}></ChevronLeft>
      </button>
    </div>
  );
}
