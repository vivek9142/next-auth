import { getSession, unstable_getServerSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage(props) {
  console.log(props);
  return <UserProfile />;
}

export default ProfilePage;

/*
brief moment of loading, which flashes on the screen when we enter profile when not 
authenticated that is maybe something we want to get rid of.

But we must not forget that Next.js blends server side and client side code, so we can 
use server side code to determine whether the user, who sent the request, is authenticated 
or not and return different page content and possibly a redirect if the user is not 
authenticated.
For this, we need to go to the profile page and then add an extra function.
*/

export async function getServerSideProps(context) {
  /*
  getSession, the good thing about this function is that you're not limited to using it on 
  client side code only.You can, as you see, it works in a component.
  */
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };

  /*
  So, now we use getServerSideProps for session tracking. And that means that in the user 
  profile component we can now get rid of our client side code,
  */
}
