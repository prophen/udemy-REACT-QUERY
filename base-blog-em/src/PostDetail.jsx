import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <>
        <div>Something went wrong</div>
        <p>{error.toString()}</p>
      </>
    );
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && <div className="loading">Deleting...</div>}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <div className="success">The post was (not) deleted</div>
        )}
      </div>{" "}
      <div>
        <div>
          <button onClick={() => updateMutation.mutate(post.id)}>
            Update title
          </button>
          {updateMutation.isPending && (
            <div className="loading">Updating post</div>
          )}
          {updateMutation.isError && (
            <div className="error">
              Error updating title: {updateMutation.error.toString()}
            </div>
          )}
          {updateMutation.isSuccess && (
            <div className="success">The post was (not) updated</div>
          )}
        </div>
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
