// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityManagement {
    struct Identity {
        string Name;
        string DOB;
        string AadharNumber;
        string Identificationmark;
    }

    mapping(address => Identity) private identities;
    mapping(address => bool) private authorizedEntities;

    event IdentityRegistered(address indexed user);
    event AuthorizationGranted(address indexed user, address indexed entity);
    event AuthorizationRevoked(address indexed user, address indexed entity);

    modifier onlyAuthorized() {
        require(authorizedEntities[msg.sender], "Unauthorized entity");
        _;
    }

    function registerIdentity(
        string memory _name,
        string memory _dob,
        string memory _aadhar,
        string memory _id1
    ) public {
        require(bytes(_name).length > 0, "Invalid name");
        require(bytes(_dob).length > 0, "Invalid age");
        require(bytes(_id1).length > 0, "Invalid nationality");

        Identity storage identity = identities[msg.sender];
        require(
            bytes(identity.name).length == 0,
            "Identity already registered"
        );

        identity.name = _name;
        identity.dob = _dob;
        identity.aadhar = _aadhar;
        identity.id1 = _id1;

        emit IdentityRegistered(msg.sender);
    }

    function grantAuthorization(address _entity) public {
        require(_entity != address(0), "Invalid entity address");
        require(!authorizedEntities[_entity], "Entity already authorized");

        authorizedEntities[_entity] = true;

        emit AuthorizationGranted(msg.sender, _entity);
    }

    function revokeAuthorization(address _entity) public {
        require(_entity != address(0), "Invalid entity address");
        require(authorizedEntities[_entity], "Entity not authorized");

        authorizedEntities[_entity] = false;

        emit AuthorizationRevoked(msg.sender, _entity);
    }

    function showAuthorization(address _entity) public view returns (bool) {
        require(_entity != address(0), "Invalid entity address");

        return (authorizedEntities[_entity]);
    }

    function getIdentity(
        address _user
    )
        public
        view
        onlyAuthorized
        returns (string memory, string memory, string memory, string memory)
    {
        Identity memory identity = identities[_user];
        return (
             identity.name = _name;
        identity.dob = _dob;
        identity.aadhar = _aadhar;
        identity.id1 = _id1;
        );
    }
}
