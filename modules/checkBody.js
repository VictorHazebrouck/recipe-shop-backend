const EnumsRecipes = require("./enums");

const checkRecipe = (data) => {
  const {
    name,
    instructions,
    ingredients,
    dishType,
    preparationTime,
    difficulty,
    regime,
    tags,
  } = data;
  if (!name || !name.length > 1)
    return { result: false, error: "'name' must be a non-null string" };
  if (!instructions)
    return {
      result: false,
      error: "'instructions' must be present and non-null",
    };
  if (!ingredients)
    return {
      result: false,
      error: "'ingredients' must be an Array of Objects",
    };
  if (!EnumsRecipes.dishType.some(dishType))
    return {
      result: false,
      error: `invalid 'dishType', please use:${EnumsRecipes.dishType.join(
        ". "
      )}`,
    };
  if (!preparationTime)
    return { result: false, error: "'preparationTime' must be a number" };
  if (!EnumsRecipes.difficulty.some(difficulty))
    return {
      result: false,
      error: `invalid 'difficulty', please use: ${EnumsRecipes.difficulty.join(
        ". "
      )}`,
    };
  if (!EnumsRecipes.tags.some(tags))
    return {
      result: false,
      error: `invalidd 'tags', please use: ${EnumsRecipes.tags.join(". ")}`,
    };
  if (!EnumsRecipes.regime.some(regime))
    return {
      result: false,
      error: `invalidd 'tags', please use: ${EnumsRecipes.regime.join(". ")}`,
    };
  return {
    result: true,
    message: "all fields are valid, if error refer to Schema validation",
  };
};

function checkBody(body, keys) {
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === "") {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody, checkRecipe };
