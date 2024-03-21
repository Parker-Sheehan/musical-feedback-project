import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ProfileData } from "../views/ProfilePage";
import { Genre } from "../views/ProfilePage";
import { useEffect } from "react";
import { useAppSelector } from "../../store/store";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  setProfileDataHandler: (profileDataObj: ProfileData) => void;
  profileData: ProfileData;
}

const MyVerticallyCenteredModal: FC<ModalProps> = (props) => {
  let { profilePicture, displayName, genres, userId, following } = props.profileData;

  console.log(props.profileData)

  let loggedInUserId = useAppSelector((state) => state.login.userId);

  let genreArray = [
    { genreName: "Drum and Bass", genreId: 1 },
    { genreName: "Trap", genreId: 2 },
    { genreName: "House", genreId: 3 },
    { genreName: "Dubstep", genreId: 4 },
    { genreName: "Techno", genreId: 5 },
    { genreName: "Bass", genreId: 6 },
    { genreName: "Experimental", genreId: 7 },
    { genreName: "Trance", genreId: 8 },
    { genreName: "Hard Dance", genreId: 9 },
    { genreName: "Breakbeat", genreId: 10 },
  ];

  let [newPfpUrl, setNewPfpUrl] = useState<string>(profilePicture);
  let [newDisplayName, setNewDisplayName] = useState<string>(displayName);
  const [selectedGenresState, setSelectedGenresState] =
    useState<Genre[]>(genres);

  useEffect(() => {
    setNewDisplayName(displayName);
    setNewPfpUrl(profilePicture);
    setSelectedGenresState(genres);
  }, [props.show]);

  const handleCheckboxChange = (genre: Genre) => {
    // Toggle the state of the selected genre
    setSelectedGenresState((prevSelectedGenres) => {
      if (prevSelectedGenres?.some((g) => g.genreId === genre.genreId)) {
        return prevSelectedGenres.filter((g) => g.genreId !== genre.genreId);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  const editProfileInfo = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let newProfileDataObj = {
      displayName: newDisplayName,
      genres: selectedGenresState,
      profilePicture: newPfpUrl,
      userId,
      following,
    };
    props.setProfileDataHandler(newProfileDataObj);
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {loggedInUserId === userId ? (
            <h2>Change Profile Info</h2>
          ) : (
            <h2>{displayName}'s Prefered Genres</h2>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={editProfileInfo} id="editProfileInfoForm">
          {loggedInUserId === userId ? (
            <>
              <h4>Picture URL</h4>
              <input
                type="text"
                placeholder="URL"
                value={newPfpUrl}
                onChange={(evt) => {
                  setNewPfpUrl(evt.target.value);
                }}
              />
              <h4>Display Name</h4>
              <input
                type="text"
                value={newDisplayName}
                onChange={(evt) => {
                  setNewDisplayName(evt.target.value);
                }}
              />
              <h4>Selected Genres</h4>
          {genreArray.map((genre) => (
            <div key={genre.genreId}>
              <input
                type="checkbox"
                id={genre.genreName}
                name={genre.genreName}
                value={genre.genreId}
                checked={selectedGenresState?.some((g) => {
                  return g.genreId === genre.genreId;
                })}
                onChange={() => handleCheckboxChange(genre)}
              />
              <label htmlFor={genre.genreName}>{genre.genreName}</label>
            </div>
          ))}
              
            </>
          ): (
            <>
            <h4>Selected Genres</h4>
            {genreArray.map((genre) => (
              <div key={genre.genreId}>
                <input
                  type="checkbox"
                  id={genre.genreName}
                  name={genre.genreName}
                  value={genre.genreId}
                  disabled={true}
                  checked={selectedGenresState?.some((g) => {
                    return g.genreId === genre.genreId;
                  })}
                  onChange={() => handleCheckboxChange(genre)}
                  />
                <label htmlFor={genre.genreName}>{genre.genreName}</label>
              </div>
            ))}
            </>

          )}
        </form>
      </Modal.Body>
      <Modal.Footer>
        {loggedInUserId === userId && (
          <Button type="submit" form="editProfileInfoForm">
            Save
          </Button>
        )}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
