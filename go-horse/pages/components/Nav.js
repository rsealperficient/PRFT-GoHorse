import React from "react";
import Link from 'next/link'
 
function Nav() {
    return (
      <div>
      <h1>Samples</h1>
      <ul>
        
        <li><h2><Link href="/gohorseHome" passHref>Contentful CMS Sandbox: Go Horse Methodology</Link></h2></li>
        <li><h2><Link href="/launchHome" passHref>Public Launched GraphQL: Spacial lauches list - </Link></h2></li>
      </ul>
      </div>
    )
  }
  
  export default Nav