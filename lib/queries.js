import { groq } from "next-sanity";

export const articleQuery = groq`
    *[_type == 'article' && status == 'approved']{
        _id,
        title,
        imgurl,
        content,
    }
`;
