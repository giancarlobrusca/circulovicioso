import { groq } from "next-sanity";

export const articleQuery = groq`
    *[_type == 'article']{
        title,
        bio
    }
`;
