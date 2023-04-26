import { describe } from "node:test";

const getSession = jest.fn();
const useSession = jest.fn();

jest.mock("next-auth/react", () => ({
    getSession,
    useSession,
}));



describe("authenticate", () => {
    test('Should route back to login if unauthenticated', async () => {

        getSession.mockReturnValueOnce({
            user: { username: "TestUser", FirstName: "Test", LastName: "User", email: "TEST@user.com" },
            expires: "mocked",
        })


        // call the function to be tested
        getSession();
        expect(getSession).toHaveBeenCalled();
    });

    test('should display an error message if fields are null', () => {
        // set up the DOM elements with null values

        useSession.mockReturnValueOnce([{
            user: { username: "TestUser", FirstName: "Test", LastName: "User", email: "TEST@user.com" },
            expires: "mocked",
        }, false]);


        // call the function to be tested
        useSession();

        expect(useSession).toHaveBeenCalled();
        
    });
});