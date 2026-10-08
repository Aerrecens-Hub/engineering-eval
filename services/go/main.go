package main

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

type activity struct {
	EngineerID string `json:"engineerId"`
	Type       string `json:"type"`
}

type aggregateRequest struct {
	Activities []activity `json:"activities"`
}

type aggregateResponse map[string]map[string]int

type errorResponse struct {
	Error string `json:"error"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/aggregate", handleAggregate)

	address := "127.0.0.1:8080"
	log.Printf("Go service listening on http://%s", address)
	log.Fatal(http.ListenAndServe(address, mux))
}

func handleAggregate(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, errorResponse{Error: "Method not allowed"})
		return
	}

	var request aggregateRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeJSON(w, http.StatusBadRequest, errorResponse{Error: "Malformed JSON"})
		return
	}

	counts, err := aggregate(request)
	if err != nil {
		writeJSON(w, http.StatusNotImplemented, errorResponse{Error: err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, counts)
}

func aggregate(request aggregateRequest) (aggregateResponse, error) {
	_ = request.Activities
	return nil, errors.New("Not implemented. Aggregate activity counts by engineer and activity type.")
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}
