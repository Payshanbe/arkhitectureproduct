import type { Access, Where } from "payload";

const publishedOnlyWhere: Where = {
  published: {
    equals: true,
  },
};

export const publishedOnly: Access = ({ req }) => {
  if (req.user) {
    return true;
  }

  return publishedOnlyWhere;
};
