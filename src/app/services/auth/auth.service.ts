import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { defer, from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<User | null>(null); //señal pública accesible desde componentes

  constructor(private auth: Auth) {
    authState(this.auth).subscribe(user => {
      this.user.set(user);
    });
  }

  login(email: string, password: string): Observable<any> {
    const res = () => signInWithEmailAndPassword(this.auth, email, password);
    return defer(res);
  }

  signup(email: string, password: string, username: string): Observable<any> {
    const newUser = () => createUserWithEmailAndPassword(this.auth, email, password);
    return defer(newUser).pipe(
      switchMap(userCreds => {
        const user = userCreds.user;
        return from(updateProfile(user, { displayName: username})).pipe(
          switchMap(() => from(Promise.resolve(userCreds)))
        );
      })
    );
  }

  logout(): Observable<any> {
    const res = () => signOut(this.auth);
    return defer(res);
  }

  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

}
