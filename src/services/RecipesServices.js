import HttpCommon from "./HttpCommon";

const getAll = (user_id) => {
  return HttpCommon.get(`/recipes/${user_id}`);
};

const get = id => {
  return HttpCommon.get(`/recipe/${id}`);
};

const create = data => {
  return HttpCommon.post("/recipe", data);
};

const update = (id, data) => {
  return HttpCommon.put(`/recipe/${id}`, data);
};

const remove = id => {
  return HttpCommon.delete(`/recipe/${id}`);
};

const methods = {
  getAll,
  get,
  create,
  update,
  remove
}
export default methods