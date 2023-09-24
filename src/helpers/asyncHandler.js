const asyncHandler = async (promise) => {
  try {
    if (!(promise instanceof Promise))
      throw new TypeError('The passed argument is not of "Promise" type');

    const result = await promise;

    return [result, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export default asyncHandler;
