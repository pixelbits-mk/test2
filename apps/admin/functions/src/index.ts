import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
export const addMessage = functions.https.onRequest(async (req, res) => {
  if (req.query.text !== "test123456") {
    res.status(401).send("Authentication required.");
  } else {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore()
        .collection("messages")
        .add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  }
});

// Listens for new messages added to /messages/:documentId/original
// and creates an uppercase version of the message to
// /messages/:documentId/uppercase
export const makeUppercase = functions.firestore.document(
    "/messages/{documentId}")
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log("Uppercasing", context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks
      // inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });
export const addModerator = functions.https.onCall((data, context) => {
  if (context && context.auth && context.auth.token.moderator !== true) { // 1
    return {
      error:
            "Request not authorized. User must be" +
            " a moderator to fulfill request.",
    };
  } // 2
  const email = data.email; // 3
  return grantModeratorRole(email).then(() => {
    return {
      result: `Request fulfilled! ${email} is now a
                moderator.`,
    };
  }); // 4
});

export const addAdmin = functions.https.onCall((data, context) => {
  if (context && context.auth && context.auth.token.moderator !== true) { // 1
    return {
      error:
            "Request not authorized. User must be" +
            " a moderator to fulfill request.",
    };
  } // 2
  const email = data.email; // 3
  return grantAdminRole(email).then(() => {
    return {
      result: `Request fulfilled! ${email} is now a
                moderator.`,
    };
  }); // 4
});

/**
 * Adds two numbers together.
 * @param {string} email The first number.
 * @return {int} The sum of the two numbers.
 */
async function grantModeratorRole(email: string) {
  const user = await admin.auth().getUserByEmail(email); // 1
  if (user.customClaims && user.customClaims.moderator === true) {
    return;
  } // 2
  return admin.auth().setCustomUserClaims(user.uid, {
    moderator: true,
  }); // 3
}

/**
 * Adds two numbers together.
 * @param {string} email The first number.
 * @return {int} The sum of the two numbers.
 */
async function grantAdminRole(email: string) {
  const user = await admin.auth().getUserByEmail(email); // 1
  if (user.customClaims && user.customClaims.admin === true) {
    return;
  } // 2
  return admin.auth().setCustomUserClaims(user.uid, {
    admin: true,
  }); // 3
}

