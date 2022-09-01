import { Provider } from "next-auth/client";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  /*
  So we are setting this session Prop on this profile page and we are setting it to this 
  session which we already loaded and validated with that service side code.
  That means that not all our pages, but some pages in this case, the Profile page we'll 
  have a session Prop with session data. So we can set the session for this Provider 
  component equal to pageProps.session. 
  
  In most cases, this will be undefined because most pages don't have this Prop but our 
  profile page, for example, does have it.
  
  Now, if we loaded number of component, where does this not set session is on the find 
  and use session we'll still do its thing and check it manually.
  
  we can save some performance and a wide some redundant HTTP requests. And that's never a 
  bad thing simply by wrapping our Application with this extra provider component
  and utilizing the information which we already have,
  */
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

/*
If I reload, you see there is a request being sent to /api/auth/session.
That request is actually sent by that use session hook. And it's sent to check Whether 
that session cookie which had found is valid, because we can't validate that

with client site JavaScript for security reasons. Hence that cookie needs to be sent to an 
end point which then determines whether it is valid or not. So that's why this request is 
being sent. There is nothing wrong with this request, but since we already checked our 
session here in getServerSideProps. when we loaded slash profile we already know that we 
are authenticated. 

So this is actually a redundant request which is being sent here. And we can avoid it,
by using a extra component offered by next auth in our _app.JS file.
So in this file which wraps all our page components,which are being rendered.
We can import the special Provider component from next-auth/client.
This is a wrapper which we can wrap around all our other components.
So around the layout and de nested components and then Provider
once a session prop, and here we simply set, any session data, which we might already have.

*/
