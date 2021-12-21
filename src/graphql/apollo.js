import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { getAuthData } from "../util";
import { GRAPHQL_URL } from "../config";

const auth = getAuthData();
const token = auth.jwtToken ? `Bearer ${auth.jwtToken}` : "";
console.log(auth,'======>', token)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(Array.isArray(graphQLErrors) && graphQLErrors[0].extensions.code==='UNAUTHENTICATED'){
    window.location.reload()
  }
  if (graphQLErrors) {

    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});
// const dispatch = useDispatch();

// if (auth.jwtToken) {
//   const { exp } = jwtDecode(auth.jwtToken);
//   const sessionOut = exp * 1000 - 60000;
//   if (Date.now() >= sessionOut) {
//     window.localStorage.clear();
//     window.location.reload();
//   } else {
//   }
// }

const uploadLink = createUploadLink({
  uri: GRAPHQL_URL,
  headers: {
    Authorization: token,
  },
});

const apollo = new ApolloClient({
  link: ApolloLink.from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
  defaultHttpLink: false,
  connectToDevTools: true,
});

apollo.defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

export default apollo;
