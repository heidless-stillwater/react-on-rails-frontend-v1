import { objectToFormData, formDataToObject } from "./formDataHelper";

describe("objectToFormData", () => {
  it("should convert simple object to FormData", () => {
    const titleData = "Hello World!"
    const bodyData = "This is a test"

    const expected_object = {
      title: titleData,
      body: "This is a test",
    };

    const actual_object = objectToFormData(expected_object);
    
    expect(actual_object.get("title")).toEqual(expected_object.title);
    expect(actual_object.get("body")).toEqual(expected_object.body);
  });

  it("should hande nested objects", () => {
    const expected_object = {
      post: {
        title: "Hello World!",
        body: "This is a test",
      }
    };
    const actual_object = objectToFormData(expected_object);
    expect(actual_object.get("post[title]")).toEqual(expected_object.post.title);
    expect(actual_object.get("post[body]")).toEqual(expected_object.post.body);
  });

  it("should handle Date objects", () => {
    const date = new Date("2023-10-01T00:00:00Z");
    const expected_object = {
      post: {
        title: "Hello World!",
        body: "This is a test",
        created_at: date,
      },
    };
    const actual_object = objectToFormData(expected_object);

    expect(actual_object.get("post[created_at]")).toEqual(
      expected_object.post.created_at.toISOString()
    );
  });

  
  // it("should handle File objects", () => {
  //   const file = new File(["content"], "filename.txt");
  //   const expected_object = {
  //     post: {
  //       title: "Hello World",
  //       body: "This is a test",
  //       file: file,
  //     },
  //   };
  //   const actual_object = objectToFormData(expected_object);

  //   expect(actual_object.get("post[title]")).toEqual(
  //     expected_object.post.title
  //   );
  //   expect(actual_object.get("post[body]")).toEqual(expected_object.post.body);
  //   expect(actual_object.get("post[file]")).toEqual(expected_object.post.file);
  // });

});

describe("formDataToObject", () => {
  it("should convert FormData to object", () => {
      const formData = new FormData();
      formData.append("a", "1");
      formData.append("b", "2");

      const result = formDataToObject(formData);

      expect(result).toEqual({
        a: "1", 
        b: "2", 
      });
  });


});