import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner/Spinner";
import Repos from "../repos/Repos";

interface Props {
  match: {
    params: {
      login: string;
    };
  };
  getUser: (login: string) => void;
  getUserRepos: (login: string) => void;
  user: {
    name: string;
    company: string;
    avatar_url: string;
    location: string;
    bio: string;
    blog: string;
    login: string;
    html_url: string;
    followers: string;
    following: string;
    public_repos: string;
    public_gists: string;
    hireable: string;
  };
  repos: repo[];
  loading: boolean;
}

interface repo {
  html_url: string;
  name: string;
  id: string;
}

const User = ({
  match: { params },
  getUser,
  getUserRepos,
  user,
  repos,
  loading
}: Props) => {
  useEffect(() => {
    getUser(params.login);
    getUserRepos(params.login);
  }, [params.login]);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;
  const UntypedRepos = Repos as any;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <UntypedRepos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  params: PropTypes.object,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default User;
