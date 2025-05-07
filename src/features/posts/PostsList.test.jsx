import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostsList from "./PostsList";
import * as postsService from "../../services/postService";

jest.mock("../../constants", () => ({
  API_URL: "http://your-test-api-url",
}));

jest.mock("../../services/postService", () => ({
  fetchAllPosts: jest.fn(),
  deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe("PostsList component", () => {
  const mockPosts = [
    { id: 1, title: "Post 1", body: "Hello World" },
    { id: 2, title: "Post 2", body: "Hello World" },
  ];

  beforeEach(() => {
    postsService.fetchAllPosts.mockResolvedValue(mockPosts);
    postsService.deletePost.mockResolvedValue();
  });

  test("renders the list of posts", async () => {
    render(<PostsList />, { wrapper: MemoryRouter });

    await waitFor(() => screen.getByText("Post 1"));

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  test("deletes a post when delete button is clicked", async () => {
    render(<PostsList />, { wrapper: MemoryRouter });

    const postText = "Post 1";
    await waitFor(() => screen.getByText(postText));

    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() => expect(postsService.deletePost).toHaveBeenCalled());

    // expect(screen.queryByText(postText)).not.toBeInTheDocument();

  });


});
