
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;

// standard imports
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import { act } from "react";

// custom
import NewPostForm from "./NewPostForm";
import { createPost } from "../../services/postService";

jest.mock("../../services/postService", () => ({
  createPost: jest.fn(() => {
    return{
      id: 1,
      title: "Test Post",
      body: "This is a test post",
    };
  }),
}));
 
describe("NewPostForm", () => {
  const renderForm = () => {
    render(
      <Router>
        <NewPostForm />
      </Router>
    );
  }

  afterEach(() => {
    jest.clearAllMocks();
  });


  test ("need to render the NewPostsForm and allow typing", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /Create/i });

    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();

    const expectedTitle = "Test Post";
    const expectedBody ="This is a test post";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { 
      target: { value: expectedBody },
    });
    
    expect(titleInput.value).toBe(expectedTitle);
    expect(bodyInput.value).toBe(expectedBody);
    expect(submitButton).toBeInTheDocument();

  });


  test ("submits form & redirects to the Posts page", async () => {
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /Create/i });
    
    const expectedTitle = "Test Post";
    const expectedBody ="This is a test post";

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { 
      target: { value: expectedBody },
    });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(createPost).toHaveBeenCalledTimes(1);
  });

  test ("displays error message when post creation fails", async () => {
    createPost.mockRejectedValue(new Error("failed to create post"));
    
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(jest.fn());
    
    renderForm();

    const titleInput = screen.getByLabelText(/Title:/i);
    const bodyInput = screen.getByLabelText(/Body:/i);
    const submitButton = screen.getByRole("button", { name: /Create/i });

    const expectedTitle = "Test Post";
    const expectedBody ="This is a test post";  

    fireEvent.change(titleInput, { target: { value: expectedTitle } });
    fireEvent.change(bodyInput, { 
      target: { value: expectedBody },
    });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "failed to create post: ",
      new Error("failed to create post")
    );

  });

});
