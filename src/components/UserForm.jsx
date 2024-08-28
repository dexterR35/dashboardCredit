import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc, runTransaction } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, dbFirestore } from '../firebase/config';

const UserCreationForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '', role: '', name: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
        role: Yup.string().oneOf(['admin', 'user'], 'Invalid role').required('Required'),
        name: Yup.string().required('Required'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Create a new user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;

          // Start a Firestore transaction
          await runTransaction(dbFirestore, async (transaction) => {
            // Reference for the new document in c_roles
            const roleDocRef = doc(collection(dbFirestore, "c_roles"));

            // Data to be stored in c_roles
            const roleData = {
              uid: user.uid,
              role: values.role,
              name: values.name,
              email: values.email,
            };

            // Set data in c_roles with generated document ID
            transaction.set(roleDocRef, roleData);

            // Reference for the corresponding document in users collection
            const userDocRef = doc(collection(dbFirestore, "users"));

            // Data to be stored in users
            const userData = {
              id: roleDocRef.id,  // Using the ID from c_roles
              uid: user.uid,
              name: values.name,
              email: values.email,
              role: values.role,
              // Add any additional fields for the user's table data here
            };

            // Set data in users collection
            transaction.set(userDocRef, userData);
          });

          toast.success('User created successfully!');
        } catch (error) {
          console.error('Error creating user:', error);
          toast.error(`Error creating user: ${error.message}`);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Field name="email" type="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Field name="password" type="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <Field as="select" name="role" className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
              <option value="" label="Select role" />
              <option value="admin" label="Admin" />
              <option value="user" label="User" />
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Field name="name" type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserCreationForm;
// Explanation:
// Transaction:

// The runTransaction method is used to ensure that all operations within the transaction block either succeed together or fail together. This is crucial for maintaining consistency across the c_roles and users collections.
// Auto-Generated Document IDs:

// A new document reference is created using doc(collection(dbFirestore, "c_roles")) which generates a unique ID for the document in the c_roles collection. This ID is then used as a reference in the users collection.
// Data Structure:

// The roleData object is written to the c_roles collection, containing uid, role, name, and email.
// The userData object is written to the users collection, containing the id (which matches the document ID from c_roles), uid, name, email, and role.
// Consistency:

// If any operation within the transaction fails, none of the data will be written, ensuring that the c_roles and users collections remain consistent.
// Toast Notifications:

// Success or error messages are displayed using react-toastify to inform the user of the operation's outcome.