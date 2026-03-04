import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Data Types
  public type LaunchStatus = {
    #upcoming;
    #live;
    #ended;
  };

  public type Launch = {
    id : Nat;
    projectName : Text;
    ticker : Text;
    description : Text;
    launchDate : ?Text;
    totalSupply : ?Nat;
    priceInDoge : Text;
    fundraiseGoal : ?Text;
    status : LaunchStatus;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  // Backup data module
  module Launch {
    public func compare(launch1 : Launch, launch2 : Launch) : Order.Order {
      Nat.compare(launch2.id, launch1.id);
    };
  };

  // Storage
  let launches = Map.empty<Nat, Launch>();
  var nextId = 1;
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Mixin Authorization is prepended here at runtime
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin-only function to create first launch
  public shared ({ caller }) func createFirstLaunch() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let firstLaunch : Launch = {
      id = nextId;
      projectName = "DOGINALSPAD";
      ticker = "$PAD";
      description = "$PAD is the utility token of our launchpad platform, giving holders access to new project launches, exclusive allocations, and ecosystem benefits.";
      launchDate = ?"Coming Soon";
      totalSupply = ?100_000;
      priceInDoge = "1";
      fundraiseGoal = null;
      status = #upcoming;
      createdAt = Time.now();
    };

    launches.add(nextId, firstLaunch);
    nextId += 1;
  };

  // Admin-only function to create new launch
  public shared ({ caller }) func createLaunch(
    projectName : Text,
    ticker : Text,
    description : Text,
    launchDate : ?Text,
    totalSupply : ?Nat,
    priceInDoge : Text,
    fundraiseGoal : ?Text,
    status : LaunchStatus,
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let launch : Launch = {
      id = nextId;
      projectName;
      ticker;
      description;
      launchDate;
      totalSupply;
      priceInDoge;
      fundraiseGoal;
      status;
      createdAt = Time.now();
    };

    launches.add(nextId, launch);
    nextId += 1;
    launch.id;
  };

  // Admin-only function to update existing launch
  public shared ({ caller }) func updateLaunch(
    id : Nat,
    projectName : Text,
    ticker : Text,
    description : Text,
    launchDate : ?Text,
    totalSupply : ?Nat,
    priceInDoge : Text,
    fundraiseGoal : ?Text,
    status : LaunchStatus,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (launches.get(id)) {
      case (null) { Runtime.trap("Launch not found") };
      case (?existing) {
        let updatedLaunch = {
          existing with
          projectName;
          ticker;
          description;
          launchDate;
          totalSupply;
          priceInDoge;
          fundraiseGoal;
          status;
        };
        launches.add(id, updatedLaunch);
      };
    };
  };

  // Admin-only function to delete launch
  public shared ({ caller }) func deleteLaunch(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    if (not launches.containsKey(id)) {
      Runtime.trap("Launch not found");
    };
    launches.remove(id);
  };

  // Query all launches, sorted by createdAt descending
  public query ({ caller }) func getAllLaunches() : async [Launch] {
    launches.values().toArray().sort();
  };

  // Get single launch by id
  public query ({ caller }) func getLaunchById(id : Nat) : async Launch {
    switch (launches.get(id)) {
      case (null) { Runtime.trap("Launch not found") };
      case (?launch) { launch };
    };
  };
};
