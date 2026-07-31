import bcrypt from "bcrypt";

const password = "mypassword123";

bcrypt.hash(password, 10).then((hash) => {
  console.log(hash);
});
