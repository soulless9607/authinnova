import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface ProcessInputResult {
  cuenta?: any; // Adjust the type accordingly
  violaciones?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private accounts: any = {};
  private transactions: any = {};

  constructor(private http: HttpClient) { }

  processInput(line: string): Observable<any> {
    try {
      const data = JSON.parse(line);
      if (data.cuenta) {
        this.createAccount(data.cuenta);
        return of({ cuenta: this.accounts[data.cuenta.id], violaciones: [] });
      } else if (data.transaccion) {
        return this.authorizeTransaction(data.transaccion);
      } else {
        return of({ violaciones: ['Entrada no válida'] });
      }
    } catch (error) {
      return of({ violaciones: ['Error al analizar JSON'] });
    }
  }
  createAccount(accountData: any): void {
    const accountId = accountData.id;
    if (!this.accounts[accountId]) {
      this.accounts[accountId] = {
        tarjeta_activa: accountData.tarjeta_activa,
        límite_disponible: accountData.límite_disponible,
      };
      console.log(
        JSON.stringify({
          cuenta: this.accounts[accountId],
          violaciones: [],
        })
      );
    } else {
      console.log(
        JSON.stringify({
          cuenta: this.accounts[accountId],
          violaciones: ['cuenta-ya-inicializada'],
        })
      );
    }
  }

  authorizeTransaction(transactionData: any): Observable<any> {
    const accountId = transactionData.id;
    const currentTime = new Date();
    const twoMinutesAgo = new Date(currentTime.getTime() - 2 * 60 * 1000);

    if (!this.accounts[accountId]) {
      return new Observable((observer) => {
        observer.next({ violaciones: ['cuenta-no-inicializada'] });
        observer.complete();
      });
    }

    if (!this.accounts[accountId].tarjeta_activa) {
      return new Observable((observer) => {
        observer.next({ violaciones: ['tarjeta-no-activa'] });
        observer.complete();
      });
    }

    if (transactionData.monto > this.accounts[accountId].límite_disponible) {
      return new Observable((observer) => {
        observer.next({ violaciones: ['límite-insuficiente'] });
        observer.complete();
      });
    }

    if (!this.transactions[accountId]) {
      this.transactions[accountId] = [];
    }

    const recentTransactions = this.transactions[accountId].filter(
      (transaction: any) =>
        transaction.timestamp > twoMinutesAgo &&
        transaction.monto === transactionData.monto &&
        transaction.comerciante === transactionData.comerciante
    );

    if (recentTransactions.length > 0) {
      return new Observable((observer) => {
        observer.next({ violaciones: ['transacción-duplicada'] });
        observer.complete();
      });
    }

    this.transactions[accountId].push({
      timestamp: currentTime,
      monto: transactionData.monto,
      comerciante: transactionData.comerciante,
    });

    if (this.transactions[accountId].length > 3) {
      return new Observable((observer) => {
        observer.next({
          violaciones: ['alta-frecuencia-pequeño-intervalo'],
        });
        observer.complete();
      });
    }

    return new Observable((observer) => {
      observer.next({
        cuenta: this.accounts[accountId],
        violaciones: [],
      });
      observer.complete();
    });
  }

  processInputServer(line: string): Observable<any> {
    const url = '/process-input';
    const body = { line: line };
    return this.http.post<any>(url, body);
  }
}