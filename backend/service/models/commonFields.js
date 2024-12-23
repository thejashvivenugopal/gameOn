export const commonFields = {
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: "user"
  },
  modifiedBy: {
    type: String,
    default: "user"
  },
};

export default commonFields;