import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FC } from "react";
import { UserBasics } from "../views/FeadPage";
import { Link } from "react-router-dom";

interface FollowModalProps {
  show: string;
  onHide: () => void;
  followerArray: UserBasics[];
  followingArray: UserBasics[];
}

const FollowModal: FC<FollowModalProps> = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.show}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="size-full flex justify-center">
          <div className=" h-full w-full bg-prim">
          {props.show === "Following" && props.followingArray?.map((result) => {
              return (
                <>
                  <div className="w-full h-16 flex items-center decoration-transparent bg-prim">
                    <div
                      className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 "
                      style={{
                        backgroundImage: `url(${result.profilePicture})`,
                      }}
                    ></div>
                    <div className="size-full flex flex-col justify-around ml-3">
                      <p className="m-0 text-background text-m font-body mt-2">
                        {result.displayName}
                      </p>
                    </div>
                    <Link to={"/Profile/" + result.userId} className="bg-sec2 decoration-transparent text-text hover:opacity-70 hover:cursor-pointer flex justify-center items-center text-center mr-4"> View Profile</Link>
                  </div>
                </>
              );
            })}

            { props.show === "Followers" && props.followerArray?.map((result) => {
              return (
                <>
                  <div className="w-full h-16 flex items-center decoration-transparent bg-prim">
                    <div
                      className="bg-cover bg-center bg-no-repeat h-10 w-12 rounded-full ml-1 "
                      style={{
                        backgroundImage: `url(${result.profilePicture})`,
                      }}
                    ></div>
                    <div className="size-full flex flex-col justify-around ml-3">
                      <p className="m-0 text-background text-m font-body mt-2">
                        {result.displayName}
                      </p>
                    </div>
                    <Link to={"/Profile/" + result.userId} className="bg-sec2 decoration-transparent text-text hover:opacity-70 hover:cursor-pointer flex justify-center items-center text-center mr-4"> View Profile</Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FollowModal;
