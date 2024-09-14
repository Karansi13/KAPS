const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityManagement", function () {
  this.timeout(999999);

  let owner;
  let authorizedEntity;
  let identity;
  let oa;
  let aa;
  beforeEach(async function () {
    [owner, authorizedEntity] = await ethers.getSigners();
    oa = owner.address;
    aa = authorizedEntity.address;
    identity = await ethers.deployContract("IdentityManagement");
  });

  it("should register an identity", async function () {
    const values = {
      gasLimit: 1000000,
    };
    const name = "kal";
    const age = "20";
    const nationality = "poland";
    const height = "170cm";
    const t1 = await identity.registerIdentity(
      name,
      age,
      nationality,
      height,
      values
    );
    await t1.wait();
    const t2 = await identity.grantAuthorization(oa);
    await t2.wait();

    const result = await identity.getIdentity(oa);

    const retrievedIdentity = result;

    expect(retrievedIdentity).to.deep.equal([name, age, nationality, height]);
  });

  it("should grant authorization", async function () {
    const values2 = {
      gasLimit: 1000000,
    };
    const name = "kal";
    const age = "20";
    const nationality = "poland";
    const height = "170cm";
    const t1 = await identity.registerIdentity(
      name,
      age,
      nationality,
      height,
      values2
    );
    await t1.wait();

    const t2 = await identity.grantAuthorization(authorizedEntity.address); // Modified line
    const values = {
      gasLimit: 1000000,
    };
    await t2.wait();

    const isAuthorized = await identity.showAuthorization(
      authorizedEntity.address,
      values
    );

    expect(isAuthorized).to.be.true;
  });

  it("should revoke authorization", async function () {
    const values = {
      gasLimit: 1000000,
    };
    const tx1 = await identity.grantAuthorization(owner.address, values);
    await tx1.wait();

    const tx2 = await identity.revokeAuthorization(owner.address, values);
    await tx2.wait();

    const isAuthorized = await identity.showAuthorization(
      owner.address,
      values
    );

    expect(isAuthorized).to.be.false;
  });

  it("should get identity for authorized entity", async function () {
    const name = "John Doe";
    const age = "30";
    const nationality = "USA";
    const height = "180cm";
    const values = {
      gasLimit: 1000000,
    };
    const t1 = await identity.registerIdentity(
      name,
      age,
      nationality,
      height,
      values
    );
    await t1.wait();

    const t2 = await identity.grantAuthorization(owner.address, values);
    await t2.wait();

    const result = await identity.getIdentity(owner.address, values);
    const retrievedIdentity = result;

    expect(retrievedIdentity).to.deep.equal([name, age, nationality, height]);
  });
});
