import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
// import { useRenderCount } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

import axios from "./../lib/axios/custom";
import asyncHandler from "./../helpers/asyncHandler";
import { useGlobalContext } from "./../Context";

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const page = 1,
    per_page = 10,
    client_id = import.meta.env.VITE_API_ACCESS_KEY;

  // const renderCount = useRenderCount();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["images", searchTerm, page, per_page],
    queryFn: async () => {
      const [result, error] = await asyncHandler(
        axios.get(import.meta.env.VITE_PHOTOS_SEARCH_ROUTE, {
          params: {
            query: searchTerm,
            page,
            per_page,
            client_id,
          },
        })
      );

      if (error) throw error;

      return result.data;
    },
  });

  if (isLoading)
    return (
      <section className="image-container">
        <div className="loading"></div>
      </section>
    );

  if (isError) {
    toast.error(error.response.data.msg);
    return (
      <section className="image-container">
        <h4>There was an error!</h4>
      </section>
    );
  }

  const { results } = data;

  if (results?.length < 1) {
    return (
      <section className="image-container">
        <h4>No Results Found!</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((result) => {
        const {
          urls: { regular: regularUrl },
          id,
          alt_description,
        } = result;

        return (
          <img
            src={regularUrl}
            alt={alt_description}
            key={id}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default memo(Gallery);
