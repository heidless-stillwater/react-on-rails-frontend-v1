import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

import {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPost,
  updatePost
} from "./postService";

jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}));


describe ("post API Service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // index
  it ("fetches all posts", async () => {
    const mockData = [
      { id: 1, title: "Post 1", body: "Hello World" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchAllPosts();

    expect(result).toEqual(mockData);
  });

  // show
  it ("fetches a single post", async () => {
    const mockPostID = 1;
    const mockData = [
      { id: mockPostID, title: "Post 1", body: "Hello World" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPost(mockPostID);

    expect(result).toEqual(mockData);
  });

  // New
  // create
  it ("creates a new post", async () => {
    const mockPostID = 1;
    const mockData = [
      { id: mockPostID, title: "Post 1", body: "Hello World" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await createPost(mockData);

    expect(result).toEqual(mockData);
  });

  // edit
  // update
  it ("updates a post", async () => {
    const mockPostID = 1;
    const mockOrigData = [
      { id: mockPostID, title: "Post 1", body: "Hello World" },
    ];
    fetch.mockResponseOnce(JSON.stringify(mockOrigData));

    const result = await updatePost(mockPostID, mockOrigData);

    expect(result).toEqual(mockOrigData);
  });

  // delete
  it ("deleted a post", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(null, { status: 204 });

    const result = await deletePost(mockPostID);

    expect(result).toEqual(null);

  });

  
  it ("throw an error when the fetchAllPost response is not ok", async () => {
    // ensure we are actually throwing an error in the service
    // we can do this by mocking the response to be a 500 error
    fetch.mockResponseOnce(
      JSON.stringify({ message: "API is down" }),
      { status: 500 }
    );

    // we expect the fetchAllPosts function to throw an error
    await expect(fetchAllPosts()).rejects.toThrow("");
 
  });

  it ("throw an error when the fetchPost response is not ok", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchPost(mockPostID)).rejects.toThrow("");
  });

  it ("throw an error when the createPost response is not ok", async () => {
    const mockPostID = 1;
    const mockData = {
      title: "Post 1",
      body: "Hello World",
    };
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(createPost(mockPostID, mockData)).rejects.toThrow("");
  });

  
  it ("throw an error when the updatePost response is not ok", async () => {
    const mockPostID = 1;
    const mockData = {
      title: "Post 1",
      body: "Hello World",
    };
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(updatePost(mockPostID, mockData)).rejects.toThrow();
  });

  it ("throw an error when the deletePost response is not ok", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(mockPostID)).rejects.toThrow();
  });

});

