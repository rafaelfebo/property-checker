import React from 'react'

/* Simple footer shown at the bottom of the page.
   Keeps branding and small print in a single place so it appears on all pages. */
function Footer() {
    return (
<footer className="bg-body-tertiary text-center">

  {/* Dark strip with copyright and app name */}
  <div className="text-center p-3 bg-dark text-light" >
    {/* Small legal/branding line — year and app name */}
    © 2025 Copyright:
    <span className="" href="#">Property Checker</span>
  </div>
</footer>
            );
}

export default Footer